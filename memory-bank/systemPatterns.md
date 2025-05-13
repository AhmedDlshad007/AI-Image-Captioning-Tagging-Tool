# System Patterns: AI Image Captioning/Tagging Tool

## Architecture Overview
The application follows a simple client-side architecture with direct API integration:

```
┌─────────────────────────────────────────────┐
│                  React App                   │
│                                             │
│  ┌─────────────┐        ┌────────────────┐  │
│  │    Image    │        │     Image      │  │
│  │   Uploader  │───────▶│    Analysis    │  │
│  │  Component  │        │   Component    │  │
│  └─────────────┘        └────────────────┘  │
│           │                     │           │
└───────────┼─────────────────────┼───────────┘
            │                     │
            ▼                     ▼
┌─────────────────────┐ ┌─────────────────────┐
│  Image Processing   │ │   HuggingFace API   │
│  (Browser-based)    │ │                     │
└─────────────────────┘ └─────────────────────┘
```

## Component Structure
- **App**: Root component that manages state and renders child components
- **ImageUploader**: Handles file selection and drag-and-drop functionality
- **ImageAnalysis**: Processes images and displays AI analysis results

## Data Flow
1. User uploads an image via the ImageUploader component
2. App component receives the file and updates its state
3. ImageAnalysis component receives the file as a prop
4. ImageAnalysis converts the image to base64
5. ImageAnalysis sends API requests to HuggingFace
6. ImageAnalysis receives responses and updates its state
7. ImageAnalysis renders the results (caption and tags)

## State Management
- React's built-in `useState` hook for local component state
- Parent-to-child props for passing data down the component tree
- No global state management required due to the app's simplicity

## API Integration Pattern
- Direct API calls from the client to HuggingFace
- Environment variables for API credentials
- Axios for HTTP requests
- Async/await pattern for handling asynchronous operations
- Error handling with try/catch blocks

## UI Design Patterns
- Responsive design with Tailwind CSS
- Loading states with spinners during API calls
- Error states with clear error messages
- Card-based layout for organized information display
- Tag cloud for displaying image tags

## Event Handling
- React event handlers for user interactions
- Callback props for child-to-parent communication
- Debounced event handlers where appropriate

## Error Handling Strategy
- Try/catch blocks around API calls
- User-friendly error messages
- Graceful degradation when services are unavailable
- Console logging for debugging purposes

## Code Organization
- Component-based architecture
- TypeScript interfaces for type safety
- Separation of concerns between components
- Well-defined props and state interfaces 