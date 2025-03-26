# AI-Based Defect Detection Pilot Implementation
 
## Overview
This is a **pilot implementation** designed to detect defects in paper sheets using **Gemini 1.5 pro model API and Ollama gemma3 model**. The system utilizes **AI** to identify and classify defects in sheets with high accuracy.
 
## Features
- **LLM Integration**: Supports **Gemini** and **Ollama** for analyzing and processing defect information.
- **React Frontend**: Developed using **Vite, Tailwind CSS and React** for an interactive and responsive UI.
- **Modular Component Design**: Includes reusable components such as `sidebar.jsx` for navigation.
 
## Tech Stack
- **Frontend**: React (Vite.js), JavaScript, Tailwind CSS
- **LLM Services**: Gemini, Ollama gemma3
 
## Project Structure
```
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── sidebar.jsx
│   ├── pages/
│   │   ├── GeminiDefectChecker.jsx
│   │   ├── OllamaDefectChecker.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── index.css
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
```
 
## Installation
```sh
# Clone the repository
git clone https://github.com/chiranjeevsehgal/Intelligent-Quality-Control-System-Pilot-Implementation.git
cd Intelligent-Quality-Control-System-Pilot-Implementation
 
# Install dependencies
npm install
 
# Create a .env file and configure necessary environment variables
 VITE_GEMINI_API=<YOUR GEMINI API KEY>

# Start the development server
npm run dev
```
 
## Usage
1. Open the application in your browser.
2. Navigate to `/` or `/ollama` to analyze sheet defects
3. The model will classify defects and provide insights using LLM-based analysis.
 
## Note
Ollama requires the Gemma3 model to be running locally in order to function properly

## Future Enhancements
- Implementing custom YoloV8 model trained on our personal dataset for improved accuracy.