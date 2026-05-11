import React, { useState, useRef, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
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
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 0.5 }
    );
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          boxShadow: '0 8px 32px rgba(67,233,123,0.15)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '320px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#43e97b' }}>Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        <input
          ref={el => fieldsRef.current[0] = el}
          name="identifier"
          placeholder="Username or Email"
          value={form.identifier}
          onChange={handleChange}
          required
          style={{
            marginBottom: '18px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          ref={el => fieldsRef.current[1] = el}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
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
          ref={el => fieldsRef.current[2] = el}
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(67,233,123,0.15)'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
