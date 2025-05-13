import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    maxFiles: 1,
  });

  return (
    <div className="mb-6">
      <div 
        {...getRootProps()} 
        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="max-h-64 mb-4 rounded shadow-md" />
            <p className="text-sm text-gray-500">Drag a new image or click to replace</p>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              {isDragActive ? "Drop the image here" : "Drag and drop an image, or click to select"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader; 