import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registatration/Registration';
import Login from './components/Login/Login';
import AdminLogin from './components/Admin/AdminLogin';
import PlayerQuizzes from './components/Player/PlayerQuizzes';
import Quiz from './components/Quiz/Quiz';
import AdminQuizzes from './components/Admin/AdminQuizzes';
import PlayQuiz from './components/Quiz/PlayQuiz';
import AdminPlayerList from './components/Admin/AdminPlayerList';
import PlayerRooms from './components/Player/PlayerRooms';
import Room from './components/Room/Room';
import PlayQuizMultiplayer from './components/Quiz/PlayQuizMultiplayer';

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
        <Route path="/admin-quizzes" element={<AdminQuizzes />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
        <Route path="/admin-players-list" element={<AdminPlayerList />} />
        <Route path="/player-rooms" element={<PlayerRooms />} />
        <Route path="/room-to-play" element={<Room />} />
        <Route path="/play-quiz-multiplayer" element={<PlayQuizMultiplayer />} />
      </Routes>
    </Router>
  );
}

export default App;
