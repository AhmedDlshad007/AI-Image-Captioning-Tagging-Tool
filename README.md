# AI Image Captioning & Tagging Tool

A simple, visually appealing application that uses AI to generate captions and tags for uploaded images.

## Features

- Drag-and-drop image upload interface
- Real-time image captioning using Hugging Face's BLIP model
- Image tagging using ResNet-50 model
- Responsive, modern UI built with React and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- Hugging Face account with API token

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Add your Hugging Face API token:
   - Sign up at [Hugging Face](https://huggingface.co/) if you don't have an account
   - Get your API token from your profile settings
   - Replace `hf_REPLACE_WITH_ACTUAL_TOKEN` in the `ImageAnalysis.tsx` file with your actual token

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to the URL displayed in your terminal (typically http://localhost:5173)

## How to Use

1. Drag and drop an image onto the upload area (or click to select a file)
2. Wait for the AI to process the image (this typically takes a few seconds)
3. View the generated caption and tags

## Technologies Used

- React + TypeScript
- Vite (for fast development)
- Tailwind CSS (for styling)
- React Dropzone (for file uploads)
- Hugging Face Inference API (for AI models)
  - BLIP model for image captioning
  - ResNet-50 for image tagging

## Limitations

- Free Hugging Face API has rate limits
- Processing large images may take longer
- Model accuracy varies based on image content

## License

MIT

---

This project was created as a simple demo of integrating AI capabilities into a modern web application.
