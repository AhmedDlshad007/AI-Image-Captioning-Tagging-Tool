import { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import ImageAnalysis from './components/ImageAnalysis'
import './App.css'

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Captioning & Tagging</h1>
          <p className="text-lg text-gray-600">
            Drag & drop any image to get AI-generated captions and tags
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            
            {imageFile && (
              <ImageAnalysis imageFile={imageFile} />
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by React + HuggingFace AI Models</p>
          <p className="mt-1">
            Note: This demo requires a valid HuggingFace API token.
            Set it in an .env file as VITE_HUGGINGFACE_API_TOKEN.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
