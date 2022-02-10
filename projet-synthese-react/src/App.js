import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registatration/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration/>} />
      </Routes>
    </Router>
  );
}

export default App;
