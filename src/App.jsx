import './App.css'
import { Routes, Route } from "react-router-dom";
import GeminiDefectChecker from './pages/GeminiDefectChecker';
import OllamaDefectChecker from './pages/OllamaDefectChecker';
import CloudDefectCheckerPipeline from './pages/CloudProcessingPipeline';
import EdgeDefectCheckerPipeline from './pages/EdgeProcessingPipeline';

function App() {
  
  return (
    <Routes>
            <Route path="/" element={<GeminiDefectChecker />} />
            <Route path="/ollama" element={<OllamaDefectChecker />} />
            <Route path="/cloudpipeline" element={<CloudDefectCheckerPipeline/> } />
            <Route path="/edgepipeline" element={<EdgeDefectCheckerPipeline/> } />
    </Routes>
  )
}

export default App
