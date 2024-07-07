import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoReloadOutline } from "react-icons/io5";

const DeactivatedStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/students/deactivated')
      .then(response => setStudents(response.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  };

  const activateStudent = (id) => {
    axios.put(`http://localhost:5000/students/${id}`, { active: true })
      .then(() => {
        fetchStudents(); // Fetch the updated list of students
      })
      .catch(error => console.error('There was an error activating the student!', error));
  };

  const deleteStudentPermanently = (id) => {
    axios.delete(`http://localhost:5000/students/permanent/${id}`)
      .then(() => {
        fetchStudents(); // Fetch the updated list of students
      })
      .catch(error => console.error('There was an error deleting the student permanently!', error));
  };

  return (
    <div>
      <h1 className='text-purple pt-4 pb-2'>Deactivated Students List</h1>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Grade</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Photograph</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.grade}</td>
              <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>
                <img src={`http://localhost:5000/uploads/${student.photograph}`} alt="Photograph" width="50" height="50" />
              </td>
              <td>
                <div className='d-flex'>
                  <button className='btn btn-add border-0' onClick={() => activateStudent(student._id)}>
                    <IoReloadOutline size={22} />
                  </button>
                  <button className='btn btn-add border-0' onClick={() => deleteStudentPermanently(student._id)}>
                    <RiDeleteBin6Line size={22} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeactivatedStudents;
