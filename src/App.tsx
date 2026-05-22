import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PomodoroTimer from './components/PomodoroTimer';
import Home from './pages/Home';
import SubjectPage from './pages/SubjectPage';
import UploadPage from './pages/UploadPage';
import StudyGuide from './pages/StudyGuide';
import Quiz from './pages/Quiz';
import MatchingGame from './pages/MatchingGame';
import Flashcards from './pages/Flashcards';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:subject" element={<SubjectPage />} />
        <Route path="/subject/:subject/upload" element={<UploadPage />} />
        <Route path="/subject/:subject/study-guide" element={<StudyGuide />} />
        <Route path="/subject/:subject/quiz" element={<Quiz />} />
        <Route path="/subject/:subject/matching" element={<MatchingGame />} />
        <Route path="/subject/:subject/flashcards" element={<Flashcards />} />
      </Routes>
      <PomodoroTimer />
    </BrowserRouter>
  );
}
