import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddStudent.css'
const AddStudent = () => {
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

    axios.post('http://localhost:5000/students', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        setMessage('Student added successfully!');
        setError('');
        setStudent({
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
      })
      .catch(error => {
        setError('There was an error adding the student!');
        setMessage('');
      });
  };

  return (
    <div className='container'>
      <div className='row justify-content-center pt-5'>
        <div className='col-md-6 form-student pt-3'>
          <h2 className='text-center py-2'>Add New Student</h2>
          {message && <div className='alert alert-success' >{message}</div>}
          {error && <div className='alert alert-success' >{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className='row pb-3'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formFirstName">
                  <label className='pb-1'>First Name</label>
                  <input
                    className='form-control'
                    type="text"
                    name="firstName"
                    value={student.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group' controlId="formLastName">
                  <label className='pb-1'>Last Name</label>
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
            <div className='row pb-3'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formGrade">
                  <label className='pb-1'>Grade</label>
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
                  <label className='pb-1'>Date of Birth</label>
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
            <div className='row pb-3'>
              <div className='col-md-6'>
                <div className='form-group' controlId="formGender">
                  <label className='pb-1'>Gender</label>
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
                <div className='form-group' controlId="formPhone">
                  <label className='pb-1'>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className='form-control'
                    value={student.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='form-group pb-3' controlId="formEmail">
              <label className='pb-1'>Email</label>
              <input
                type="email"
                name="email"
                className='form-control'
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group pb-3' controlId="formAddress">
              <label className='pb-1'>Address</label>
              <input
                type="text"
                name="address"
                className='form-control'
                value={student.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group pb-3' controlId="formPhotograph">
              <label className='pb-1'>Photograph</label>
              <input
                type="file"
                name="photograph"
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
            <div className='d-flex justify-content-center py-3'>
              <button className='btn btn-add' type="submit">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
