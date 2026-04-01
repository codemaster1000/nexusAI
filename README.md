# NexusAI - Resume Analyzer

NexusAI is an AI-powered resume analysis and rewriting tool designed to help candidates optimize their resumes. It leverages advanced Large Language Models (LLMs) to scan, evaluate, and provide actionable feedback on uploaded resumes.

## Features

- **PDF Extraction**: Seamlessly upload and extract text from PDF resumes.
- **AI Analysis**: Get instant feedback, an overall resume score, and detailed sub-scores (e.g., impact, brevity, skills).
- **Visual Analytics**: Interactive scoring rings and sub-score charts to identify areas for improvement.
- **AI Rewriting Options**: Offers suggestions and automated rewriting capabilities to enhance the resume's impact.
- **Cost Tracking**: Built-in LLM cost tracking to manage API usage efficiently.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Integration**: Custom LLM client and prompt builder

## Project Structure

- `/frontend/` - Contains the React web application
- `/backend/` - Contains the Express server handling AI requests, file parsing, and business logic

## Getting Started

### Prerequisites

- Node.js (v16+)
- API key for the LLM provider (set up in the backend `.env` file)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables based on `.env.example`:
   ```bash
   cp .env.example .env
   # Add your API keys and configuration in .env
   ```
4. Start the server:
   ```bash
   npm run dev
   # or npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## License
MIT
