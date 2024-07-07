import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    photograph: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(response => {
        const studentData = response.data;
        studentData.dateOfBirth = studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toISOString().split('T')[0] : '';
        setStudent(studentData);
      })
      .catch(error => {
        console.error('There was an error fetching the student!', error);
        setError('There was an error fetching the student details!');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photograph') {
      setStudent({ ...student, [name]: files[0] });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in student) {
      formData.append(key, student[key]);
    }

    axios.put(`http://localhost:5000/students/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        setMessage('Student updated successfully!');
        setError('');
      })
      .catch(error => {
        console.error('There was an error updating the student!', error);
        setError('There was an error updating the student!');
        setMessage('');
      });
  };

  return (
    <div className='container'>
      <div className='row justify-content-center pt-5'>
        <div className='col-md-6 form-student pt-3'>
          <h2 className='text-center py-2'>Update Student Details</h2>
          {message && <div className='alert alert-success'>{message}</div>}
          {error && <div className='alert alert-danger'>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center py-3'>
              {student.photograph && (
                <img
                  src={`http://localhost:5000/uploads/${student.photograph}`}
                  alt="Student Photograph"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              )}
            </div>
            <div className='row pt-2'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formFirstName">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className='form-control'
                    value={student.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group' controlId="formLastName">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className='form-control'
                    value={student.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formGrade">
                  <label>Grade</label>
                  <input
                    type="text"
                    name="grade"
                    className='form-control'
                    value={student.grade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group' controlId="formDateOfBirth">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className='form-control'
                    value={student.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formGender">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    className='form-control'
                    value={student.gender}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group' controlId="formEmail">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className='form-control'
                    value={student.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='form-group' controlId="formPhone">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className='form-control'
                value={student.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group' controlId="formAddress">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className='form-control'
                value={student.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group' controlId="formPhotograph">
              <label>Photograph</label>

              <input
                type="file"
                name="photograph"
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='d-flex justify-content-center py-3'>
              <button className='btn btn-add' type="submit">
                Update Student
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
