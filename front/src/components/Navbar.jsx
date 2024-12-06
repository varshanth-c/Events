import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Event Management</h1>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/" className="hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-indigo-400">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/user" className="hover:text-indigo-400">
              Events
            </Link>
            
          </li>
          <li>
          <Link to="/userD" className="hover:text-indigo-400">
              User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
