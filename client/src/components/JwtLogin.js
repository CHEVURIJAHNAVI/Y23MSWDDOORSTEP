import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const { setUser, setUsername } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { token, username } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      setUser(true);
      setUsername(username);
      setMessage('Login successful!');
      navigate('/', { replace: true });
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // 💡 Inline style objects
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    input: {
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    loginButton: {
      width: '30%',
      padding: '0.5rem',
      backgroundColor: '#02075D',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    loginButtonHover: {
      backgroundColor: '#02075D',
    },
    registerLink: {
      marginTop: '1rem',
      fontSize: '0.95rem',
    },
    registerAnchor: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    message: {
      marginTop: '1rem',
      color: 'red',
    },
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.loginButton}>Login</button>

        <div style={styles.registerLink}>
          <span>New to Doorstep? </span>
          <Link to="/api/users/register" style={styles.registerAnchor}>Register</Link>
        </div>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default JWTLogin;
