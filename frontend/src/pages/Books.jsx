import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // Check if user is logged in
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await API.get('/books');
        setBooks(res.data);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleAddToCart = async (bookId) => {
    setMessage('');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await API.post(
        '/cart/add',
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Book added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add to cart.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading books...</div>;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 0',
      paddingTop: '88px', // Add gap for header
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      {message && (
        <div style={{
          position: 'fixed',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(56,249,215,0.95)',
          color: '#222',
          padding: '12px 32px',
          borderRadius: '8px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(56,249,215,0.15)'
        }}>
          {message}
        </div>
      )}
      <div style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '32px',
      }}>
      {books.length === 0 ? (
        <div style={{ color: '#fff', fontSize: '1.5rem' }}>No books found.</div>
      ) : (
        books.map(book => (
          <div key={book._id} style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(67,233,123,0.15)',
            width: '260px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img src={book.image} alt={book.name} style={{ width: '120px', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px 0', color: '#43e97b' }}>{book.name}</h3>
            <div style={{ color: '#333', marginBottom: '4px' }}><b>Author:</b> {book.author}</div>
            <div style={{ color: '#333', marginBottom: '4px' }}><b>Publisher:</b> {book.publisher}</div>
            <div style={{ color: '#333', marginBottom: '4px' }}><b>Year:</b> {book.year}</div>
            <div style={{ color: '#38f9d7', fontWeight: 'bold', marginTop: '8px' }}>₹{book.price}</div>
            <button
              onClick={() => handleAddToCart(book._id)}
              style={{
                marginTop: '16px',
                padding: '10px 24px',
                borderRadius: '25px',
                border: 'none',
                background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(67,233,123,0.15)',
                transition: 'background 0.2s'
              }}
              title={isLoggedIn ? 'Add to Cart' : 'Login to add to cart'}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default Books;
