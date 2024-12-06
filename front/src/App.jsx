// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import User from './components/User';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/userD" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
