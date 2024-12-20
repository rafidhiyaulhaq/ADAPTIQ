import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import LessonDetail from './pages/LessonDetail';
import AssessmentDetail from './pages/AssessmentDetail';
import AssessmentResult from './pages/AssessmentResult';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module/:id" element={<ModuleDetail />} />
          <Route path="/lesson/:moduleId/:sectionId/:lessonId" element={<LessonDetail />} />
          <Route path="/assessment/:id" element={<AssessmentDetail />} />
          <Route path="/assessment/:id/results" element={<AssessmentResult />} />
        </Routes>
      </div>
    </HashRouter>
  );
}