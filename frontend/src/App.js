import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundVideo from './components/BackgroundVideo';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <BackgroundVideo />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
