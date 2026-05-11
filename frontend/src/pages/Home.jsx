import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/books');
    }
  }, [navigate]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' }
    );
    gsap.fromTo(
      subtitleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(
      btnsRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 1 }
    );
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
        <h1 ref={titleRef} style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', textShadow: '0 2px 16px #000' }}>
          Welcome to BookVerse
        </h1>
        <p ref={subtitleRef} style={{ fontSize: '1.5rem', color: '#f0f0f0', margin: '20px 0', textShadow: '0 2px 8px #000' }}>
          Discover, Read, and Order Your Favorite Books Online!
        </p>
        <div ref={btnsRef} style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <Link to="/login">
            <button style={{
              padding: '12px 32px',
              fontSize: '1rem',
              borderRadius: '25px',
              border: 'none',
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(67,233,123,0.2)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'transform 0.2s',
            }}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              padding: '12px 32px',
              fontSize: '1rem',
              borderRadius: '25px',
              border: 'none',
              background: 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(56,249,215,0.2)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'transform 0.2s',
            }}>
              Register
            </button>
          </Link>
        </div>
    </div>
  );
};

export default Home;
