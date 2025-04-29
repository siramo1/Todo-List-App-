import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import All pages
import HomePage from './pages/HomePage';
import AddStudent from './pages/AddStudent';
import StudentsPage from './pages/StudentsPage';
import AllStudents from './pages/AllStudents';

function App() {
    return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/studentpage' element={<StudentsPage />} />
        <Route path='/AllStudents' element={<AllStudents />} />
      </Routes>
    </Router>
  );
}

export default App;