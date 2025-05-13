import { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageAnalysisProps {
  imageFile: File | null;
}

interface AnalysisResult {
  caption: string;
  tags: string[];
  loading: boolean;
  error: string | null;
}

const ImageAnalysis = ({ imageFile }: ImageAnalysisProps) => {
  const [result, setResult] = useState<AnalysisResult>({
    caption: '',
    tags: [],
    loading: false,
    error: null
  });

  // Get API token from environment variable or use placeholder
  // In production, this would be set in the .env file
  const HF_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN || 'hf_REPLACE_WITH_ACTUAL_TOKEN';

  useEffect(() => {
    if (!imageFile) return;

    const analyzeImage = async () => {
      setResult(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        // Image to base64
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        
        reader.onload = async () => {
          const base64Image = reader.result?.toString().split(',')[1]; // Remove data:image/jpeg;base64,
          
          if (!base64Image) throw new Error('Failed to convert image to base64');
          
          // Using HF Inference API for image captioning
          const captionResponse = await axios.post(
            'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
            { inputs: { image: base64Image } },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_API_TOKEN}`
              },
            }
          );
          
          // HF Inference API for image tagging
          const taggingResponse = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/resnet-50',
            { inputs: { image: base64Image } },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_API_TOKEN}`
              },
            }
          );
          
          const caption = captionResponse.data[0]?.generated_text || 'No caption generated';
          
          // Extract tags from tagging model response
          const tags = taggingResponse.data
            .slice(0, 10) // Take top 10 tags
            .map((tag: { label: string; score: number }) => tag.label)
            .filter((tag: string) => tag !== 'entity' && tag !== 'thing'); // Filter generic tags
          
          setResult({
            caption,
            tags,
            loading: false,
            error: null
          });
        };
      } catch (error) {
        console.error('Error analyzing image:', error);
        setResult(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to analyze image'
        }));
      }
    };

    analyzeImage();
  }, [imageFile, HF_API_TOKEN]);

  if (!imageFile) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
        Upload an image to see AI analysis
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Analysis Results</h2>
      
      {result.loading && (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="ml-3">Analyzing image...</span>
        </div>
      )}
      
      {result.error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
          <p className="font-medium">Error</p>
          <p>{result.error}</p>
          <p className="mt-2 text-sm">
            Note: This demo requires a valid HuggingFace API token. 
            You can set it in an .env file as VITE_HUGGINGFACE_API_TOKEN.
          </p>
        </div>
      )}
      
      {!result.loading && !result.error && (
        <>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Caption</h3>
            <p className="p-3 bg-gray-50 rounded">{result.caption}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              {result.tags.length === 0 && (
                <p className="text-gray-500 italic">No tags generated</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageAnalysis; 