import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeactivatedStudents from './components/DeactivatedStudents';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/students/deactivated" element={<DeactivatedStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
