import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Ensure path and import are correct

function QRCodePage() {
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get('http://localhost:3001/qrcode', {
          params: { username }
        });
        setQrCode(response.data.qrCode);
      } catch (error) {
        setMessage('Error fetching QR code.');
      }
    };

    fetchQRCode();
  }, []);

  const handleVerify2FA = async (e) => {
    e.preventDefault();

    try {
      const username = localStorage.getItem('username');
      const response = await axios.post('http://localhost:3001/verify-2fa', { username, token });
      if (response.status === 200) {
        navigate('/HomePage');
      } else {
        setMessage('Invalid 2FA token.');
      }
    } catch (error) {
      setMessage('Error verifying 2FA token.');
    }
  };

  return (
    <div className="qrcode-container">
      <h1>2FA Setup Page</h1>
      {qrCode ? (
        <div>
          <h2>Scan this QR code with your authenticator app:</h2>
          <img src={qrCode} alt="QR Code" className="qr-image" />
          <form onSubmit={handleVerify2FA} className="qrcode-form">
            <div>
              <label>Enter the OTP from your authenticator app:</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="App-button">Verify</button>
          </form>
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default QRCodePage;
