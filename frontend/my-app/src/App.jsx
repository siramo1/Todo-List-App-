import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import All pages
import HomePage from './pages/HomePage';
import AddStudent from './pages/AddStudent';
import StudentsPage from './pages/StudentsPage';

function App() {
    return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/AddStudent' element={<AddStudent />} />
        <Route path='/AllStudents' element={<StudentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;