# AI-Based Defect Detection Pilot Implementation -- Frontend
 
## Overview
This is a **pilot implementation** designed to detect defects in paper sheets using **Gemini 1.5 pro model API and Ollama gemma3 model**. The system utilizes **AI** to identify and classify defects in sheets with high accuracy.
 
## Features
- **LLM Integration**: Supports **Gemini** and **Ollama** for analyzing and processing defect information.
- **Automated Workflow**: Integrated **Google Drive** and **AppScript** to automate defect analysis.
- **Backend Integration**: Implemented a **Node.js backend** to manage API calls and processing.
- **React Frontend**: Developed using **Vite, Tailwind CSS and React** for an interactive and responsive UI.
- **Modular Component Design**: Includes reusable components such as `sidebar.jsx` for navigation.
 
## Tech Stack
- **Frontend**: React (Vite.js), JavaScript, Tailwind CSS
- **Backend**: Node.js
- **LLM Services**: Gemini, Ollama gemma3
- **Automation**: Google Drive, AppScript
 
## Project Structure
```
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── SideNavbar.jsx
│   │   ├── ImageDetailsModal.jsx
│   ├── pages/
│   │   ├── GeminiDefectChecker.jsx
│   │   ├── OllamaDefectChecker.jsx
│   │   ├── GeminiPipeline.jsx
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

# Start the development server
npm run dev
```
 
## Usage
1. Open the application in your browser.
2. Navigate to `/` or `/ollama` to analyze sheet manually defects.
3. Go to `/geminipipeline` for an automated demonstration, which runs when new files are detected in the data source.
4. The model will classify defects and provide insights using LLM-based analysis.
 
## Note
Ollama requires the Gemma3 model to be running locally in order to function properly

## Future Enhancements
- Implementing custom YoloV8 model trained on our personal dataset for improved accuracy.
