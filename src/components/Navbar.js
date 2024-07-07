import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='sticky-top'>
      <nav className="sticky-top navbar navbar-expand-lg bg-purple">
        <div className='nav-brand'><h3 className='text-white pt-1 px-5'>Student management</h3></div>
        <ul className="navbar-nav ">
          <li className="nav-item pt-1">
            <Link className="nav-link text-white px-4 text-16" to="/">Dashboard</Link>
          </li>
          <li className="nav-item  pt-1">
            <Link className="nav-link text-white px-4 text-16" to="/students/deactivated">Deactivated Students</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-4" to="/add-student"><button className='btn btn-add' type="submit">
              Add Student
            </button></Link>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default NavBar;
