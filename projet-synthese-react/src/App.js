import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registatration/Registration';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
