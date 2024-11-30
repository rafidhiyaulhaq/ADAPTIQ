import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import LessonDetail from './pages/LessonDetail';
import AssessmentDetail from './pages/AssessmentDetail';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module/:id" element={<ModuleDetail />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/assessment/:id" element={<AssessmentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}