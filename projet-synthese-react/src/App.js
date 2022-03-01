import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registatration/Registration';
import Login from './components/Login/Login';
import AdminLogin from './components/Admin/AdminLogin';
import PlayerQuizzes from './components/Player/PlayerQuizzes';
import PlayerQuiz from './components/Player/PlayerQuiz';
import AdminHomePage from './components/Admin/AdminHomePage';
import AdminQuizzes from './components/Admin/AdminQuizzes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/player-quizzes" element={<PlayerQuizzes />} />
        <Route path="/player-quiz" element={<PlayerQuiz />} />
        <Route path="/admin-homepage" element={<AdminHomePage />} />
        <Route path="/admin-quizzes" element={<AdminQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
