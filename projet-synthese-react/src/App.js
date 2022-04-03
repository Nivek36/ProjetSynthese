import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registatration/Registration';
import Login from './components/Login/Login';
import AdminLogin from './components/Admin/AdminLogin';
import PlayerQuizzes from './components/Player/PlayerQuizzes';
import Quiz from './components/Quiz/Quiz';
import AdminHomePage from './components/Admin/AdminHomePage';
import AdminQuizzes from './components/Admin/AdminQuizzes';
import PlayQuiz from './components/Quiz/PlayQuiz';
import AdminPlayerList from './components/Admin/AdminPlayerList';
import PlayerRooms from './components/Player/PlayerRooms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/player-quizzes" element={<PlayerQuizzes />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin-homepage" element={<AdminHomePage />} />
        <Route path="/admin-quizzes" element={<AdminQuizzes />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
        <Route path="/admin-players-list" element={<AdminPlayerList />} />
        <Route path="/player-rooms" element={<PlayerRooms />} />
      </Routes>
    </Router>
  );
}

export default App;
