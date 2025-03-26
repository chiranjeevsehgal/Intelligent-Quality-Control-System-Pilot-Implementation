import './App.css'
import { Routes, Route } from "react-router-dom";
import GeminiDefectChecker from './pages/GeminiDefectChecker';
import OllamaDefectChecker from './pages/OllamaDefectChecker';


function App() {
  
  return (
    <Routes>
            <Route path="/" element={<GeminiDefectChecker />} />
            <Route path="/ollama" element={<OllamaDefectChecker />} />
    </Routes>
  )
}

export default App
