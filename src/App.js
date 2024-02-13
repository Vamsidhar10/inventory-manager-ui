import React, { useState,useEffect } from 'react';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Items from './Components/Items';

function App() {
 
  return (
    <>
    {}
    <Router>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgot-password" element={< ResetPassword />}></Route>
      <Route path="/dashboard" element={< Dashboard />}></Route>
      <Route path="/items" element={< Items />}></Route>
    </Routes>
  </Router>
    </>
  
  );
}

export default App;
