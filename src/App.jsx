import './App.css'
import { Routes, Route } from "react-router-dom";
import GeminiDefectChecker from './pages/GeminiDefectChecker';
import OllamaDefectChecker from './pages/OllamaDefectChecker';
import CloudDefectCheckerPipeline from './pages/CloudProcessingPipeline';
import EdgeDefectCheckerPipeline from './pages/EdgeProcessingPipeline';
import EdgeDefectCheckerPipeline_Kafka from './pages/EdgeProcessingPipeline_Airflow';
import EdgeDefectCheckerPipeline_Custom from './pages/EdgeProcessingPipeline_Custom';

function App() {
  
  return (
    <Routes>
            <Route path="/" element={<GeminiDefectChecker />} />
            <Route path="/ollama" element={<OllamaDefectChecker />} />
            <Route path="/cloudpipeline" element={<CloudDefectCheckerPipeline/> } />
            <Route path="/edgepipeline" element={<EdgeDefectCheckerPipeline/> } />
            <Route path="/edgepipeline1" element={<EdgeDefectCheckerPipeline_Kafka/> } />
            <Route path="/edgepipeline2" element={<EdgeDefectCheckerPipeline_Custom/> } />
    </Routes>
  )
}

export default App
