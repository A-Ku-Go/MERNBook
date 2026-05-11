import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBell, FaUser, FaHome, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleNav = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header-root">
      {/* Left: Home */}
      <div className="header-left">
        <button
          onClick={() => handleNav('/')}
          className="header-icon-btn"
          title="Home"
          style={{ fontSize: '1.7rem', marginRight: '8px' }}
        >
          <FaHome />
        </button>
        <span 
          className="header-logo"
          onClick={() => handleNav('/')}
        >
          BookVerse
        </span>
      </div>

      {/* Mobile menu toggle */}
      <div className="mobile-menu-toggle">
        <button onClick={toggleMobileMenu} className="header-icon-btn" aria-label="Toggle menu">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Right: Icons and Auth */}
      <div className={`header-right${mobileMenuOpen ? ' mobile-menu-open' : ''}`}>
        <button
          onClick={() => handleNav('/cart')}
          className="header-icon-btn"
          title="Cart"
        >
          <FaShoppingCart />
        </button>
        <button
          className="header-icon-btn bell"
          title="Notifications"
        >
          <FaBell />
        </button>
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <button
              onClick={() => handleNav('/login')}
              className="header-btn"
            >
              Login
            </button>
            <button
              onClick={() => handleNav('/register')}
              className="header-btn"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="header-user" ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              className="header-icon-btn"
              style={{ fontSize: '1.2rem', color: '#43e97b', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setDropdownOpen((open) => !open)}
              title="User Menu"
            >
              <FaUser />
              <FaChevronDown style={{ fontSize: '0.9rem' }} />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  background: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 2px 12px rgba(67,233,123,0.15)',
                  minWidth: '120px',
                  zIndex: 3000,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  padding: '6px 0'
                }}
              >
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/orders'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#43e97b',
                    padding: '10px 18px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fc5c7d',
                    padding: '10px 18px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
