import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './SignIn';
import Register from './Register';
import HomePage from './HomePage';
import QRCodePage from './qrcode'; // Ensure correct import name
import './App.css'; // Ensure path and import are correct

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/qrcode" element={<QRCodePage />} />
      </Routes>
    </div>
  );
}

export default App;
