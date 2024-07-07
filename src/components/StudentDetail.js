import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(response => setStudent(response.data))
      .catch(error => console.error('There was an error fetching the student!', error));
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className='container'>
      <div className='row justify-content-center pt-5 mt-5'>
        <div className='col-md-6 form-student'>
          <div className='container  border border-white my-3'>
            <div className='d-flex justify-content-center py-4'>
              <img src={`http://localhost:5000/uploads/${student.photograph}`} alt="Photograph" width="100" height="100" />
            </div>
            <h2 className='text-center'>{student.firstName} {student.lastName}</h2>
            <div className='row px-4 '>
              <p className='text-16'>Grade: {student.grade}</p>
              <p className='text-16'>Gender: {student.gender}</p>
              <p className='text-16'> Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
              <p className='text-16'>Email: {student.email}</p>
              <p className='text-16'>Phone: {student.phone}</p>
              <p className='text-16'>Address: {student.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
