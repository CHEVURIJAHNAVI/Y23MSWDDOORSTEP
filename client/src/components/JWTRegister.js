import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/AppContext'; 
import { Link, useNavigate } from 'react-router-dom';

const JWTRegister = () => {
  const { setUser } = useAppContext(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      setUser(res.data.user); 
      setMessage('User registered successfully');
      navigate('/');
    } catch (error) {
      setMessage('Error registering user: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Inline styles
  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle = {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const fieldGroupStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px'
  };

  const labelStyle = {
    textAlign: 'left',
    fontWeight: '500'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const registerButtonStyle = {
    width: '30%',
    padding: '10px',
    border: 'none',
    backgroundColor: '#02075D',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
    marginBottom: '20px'
  };

  const loginTextStyle = {
    fontSize: '14px',
    marginTop: '10px'
  };

  const loginLinkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
    marginLeft: '5px'
  };

  const messageStyle = {
    marginTop: '20px',
    color: message.includes('Error') ? 'red' : 'green',
    fontWeight: '500'
  };

  return (
    <div > 
      
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{marginBottom: '20px'}}>Register</h2>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={registerButtonStyle}>Register</button>
        <p style={loginTextStyle}>
          Already have an account?
          
        </p>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default JWTRegister;
