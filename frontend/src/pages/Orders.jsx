import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setMessage('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Loading orders...</div>;

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
      <h2 style={{ color: '#43e97b', marginBottom: '24px' }}>Your Orders</h2>
      {orders.length === 0 ? (
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>You have no orders yet.</div>
      ) : (
        orders.map(order => {
          const orderDate = new Date(order.orderDate);
          const deliveryDate = order.deliveryDate
            ? new Date(order.deliveryDate)
            : addDays(orderDate, 2);

          // Use order totals directly from backend
          const total = order.total;
          const discountAmount = order.discountAmount || 0;
          const discountPercentage = order.discount || 0;
          const finalTotal = order.finalTotal;

          return (
            <div key={order._id} style={{
              background: 'rgba(255,255,255,0.97)',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(67,233,123,0.13)',
              width: '90%',
              maxWidth: '820px',
              marginBottom: '32px',
              padding: '24px 18px'
            }}>
              <div style={{ color: '#43e97b', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1rem' }}>
                Order ID: {order._id}
              </div>
              <div style={{ color: '#333', marginBottom: '8px' }}>
                Order Date: {orderDate.toLocaleString()}
              </div>
              <div style={{ color: '#333', marginBottom: '8px' }}>
                Delivery Date: <span style={{ color: '#38f9d7', fontWeight: 'bold' }}>
                  {deliveryDate.toLocaleDateString()}
                </span>
              </div>
              <div style={{ color: '#43e97b', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                Total Price: ₹{total}
              </div>
              {(discountAmount > 0 || discountPercentage > 0) && (
                <div style={{ color: '#fc5c7d', fontWeight: 'bold', marginBottom: '8px' }}>
                  Discount: {order.discountType === "percentage" ? `${discountPercentage}%` : `₹${discountAmount}`}
                </div>
              )}
              {/* <div style={{ color: '#38f9d7', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '16px' }}>
                Final Price: ₹{finalTotal}
              </div> */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(67,233,123,0.08)'
              }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.05rem'
                }}>
                  <th style={{ padding: '12px' }}>Book</th>
                  <th style={{ padding: '12px' }}>Qty</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr
                    key={item.book._id}
                    style={{
                      textAlign: 'center',
                      background: idx % 2 === 0 ? '#f7fafc' : '#e3f9f4',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '10px', color: '#43e97b', fontWeight: 500 }}>{item.book.name}</td>
                    <td style={{ padding: '10px', color: '#333' }}>{item.quantity}</td>
                    <td style={{ padding: '10px', color: '#38f9d7' }}>₹{item.price}</td>
                    <td style={{ padding: '10px', color: '#333' }}>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
