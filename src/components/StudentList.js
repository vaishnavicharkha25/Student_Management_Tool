import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdEdit, MdVisibility } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  };

  const deactivateStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        fetchStudents(); // Fetch the updated list of students
      })
      .catch(error => console.error('There was an error deactivating the student!', error));
  };


  return (
    <div>
      <div className='d-flex justify-content-between mt-4'>
        <h1 className='text-purple'>Students List</h1>

      </div>
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
                  <Link to={`/students/${student._id}`}>
                    <button className='btn btn-add border-0'>
                      <MdVisibility size={22} />
                    </button>
                  </Link>
                  <Link to={`/students/edit/${student._id}`}>
                    <button className='btn btn-add border-0' variant="warning">
                      <MdEdit size={22} />
                    </button>
                  </Link>
                  <button className='btn btn-add border-0' onClick={() => deactivateStudent(student._id)}>
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

export default StudentList;
