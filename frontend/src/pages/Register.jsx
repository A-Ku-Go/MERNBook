import React, { useState, useRef, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    pinCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      fieldsRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, delay: 0.5 }
    );
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '40px 32px',
          borderRadius: '18px',
          boxShadow: '0 8px 32px rgba(56,249,215,0.15)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '340px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#38f9d7' }}>Register</h2>
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        <input
          ref={el => fieldsRef.current[0] = el}
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{
            marginBottom: '14px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[1] = el}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            marginBottom: '14px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[2] = el}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            marginBottom: '14px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[3] = el}
          name="phone"
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={{
            marginBottom: '14px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[4] = el}
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          style={{
            marginBottom: '14px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[5] = el}
          name="pinCode"
          type="text"
          placeholder="Pin Code"
          value={form.pinCode}
          onChange={handleChange}
          required
          style={{
            marginBottom: '24px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          ref={el => fieldsRef.current[6] = el}
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(56,249,215,0.15)'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
