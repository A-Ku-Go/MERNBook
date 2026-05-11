import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await API.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    } catch (err) {
      setMessage('Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await API.post('/cart/remove', { bookId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Item removed from cart.');
      fetchCart();
    } catch (err) {
      setMessage('Failed to remove item.');
    }
  };

  const handleClear = async () => {
    try {
      await API.post('/cart/clear', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Cart cleared.');
      setAppliedCoupon('');
      setCoupon('');
      fetchCart();
    } catch (err) {
      setMessage('Failed to clear cart.');
    }
  };

  const handleOrderNow = async () => {
    try {
      // Only send coupon if applied
      const body = appliedCoupon ? { coupon: appliedCoupon } : {};
      await API.post('/orders', body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Order placed successfully!');
      setAppliedCoupon('');
      setCoupon('');
      fetchCart();
    } catch (err) {
      setMessage(
        err.response?.data?.message
          ? `Failed to place order: ${err.response.data.message}`
          : 'Failed to place order.'
      );
    }
  };

  const handleApplyCoupon = () => {
    setAppliedCoupon(coupon.trim());
    setMessage(coupon.trim() === "10precent" ? "Coupon applied: 10% off!" : "Coupon applied");
  };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading cart...</div>;

  const total = cart?.items?.reduce((sum, item) => sum + (item.book.price * item.quantity), 0) || 0;
  const discount = appliedCoupon === "10precent" ? Math.round(total * 0.10) : 0;
  const finalTotal = total - discount;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '80px 0 40px 0',
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
      <h2 style={{ color: '#43e97b', marginBottom: '24px' }}>Your Cart</h2>
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>Your cart is empty.</div>
      ) : (
        <>
          <table style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(67,233,123,0.15)',
            width: '90%',
            maxWidth: '800px',
            marginBottom: '24px',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ color: '#43e97b', fontWeight: 'bold', fontSize: '1.1rem' }}>
                <th style={{ padding: '12px' }}>Image</th>
                <th style={{ padding: '12px' }}>Book</th>
                <th style={{ padding: '12px' }}>Author</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Qty</th>
                <th style={{ padding: '12px' }}>Total</th>
                <th style={{ padding: '12px' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.book._id} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '8px' }}>
                    <img src={item.book.image} alt={item.book.name} style={{ width: '48px', height: '72px', objectFit: 'cover', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '8px', color: '#43e97b' }}>{item.book.name}</td>
                  <td style={{ padding: '8px', color: '#333' }}>{item.book.author}</td>
                  <td style={{ padding: '8px', color: '#38f9d7' }}>₹{item.book.price}</td>
                  <td style={{ padding: '8px', color: '#333' }}>{item.quantity}</td>
                  <td style={{ padding: '8px', color: '#333' }}>₹{item.book.price * item.quantity}</td>
                  <td style={{ padding: '8px' }}>
                    <button
                      onClick={() => handleRemove(item.book._id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {/* Final price row */}
              <tr>
                <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold', color: '#43e97b', padding: '12px 8px' }}>
                  Final Price:
                </td>
                <td style={{ fontWeight: 'bold', color: '#38f9d7', padding: '12px 8px' }}>
                  ₹{finalTotal}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {/* Coupon code input */}
          <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #43e97b',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleApplyCoupon}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Apply Coupon
            </button>
            {appliedCoupon && (
              <span style={{ color: '#43e97b', fontWeight: 'bold', marginLeft: '10px' }}>
                {appliedCoupon === "10precent" ? "10% discount applied!" : "No discount"}
              </span>
            )}
          </div>
          <div style={{ color: '#43e97b', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px' }}>
            Total: ₹{total}
          </div>
          {discount > 0 && (
            <div style={{ color: '#fc5c7d', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
              Discount: -₹{discount} ({appliedCoupon === "10precent" ? "10%" : ""})
            </div>
          )}
          <div style={{ color: '#38f9d7', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '18px' }}>
            Final Total: ₹{finalTotal}
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <button
              onClick={handleClear}
              style={{
                padding: '10px 24px',
                borderRadius: '25px',
                border: 'none',
                background: 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={handleOrderNow}
              style={{
                padding: '10px 24px',
                borderRadius: '25px',
                border: 'none',
                background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
