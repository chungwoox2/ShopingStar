import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './pages/Header';
import MainPage from './pages/Main';
import ProductForm from './pages/ProductForm';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/get');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="login">
        로그인
        <span className="sign-up">회원가입</span>
      </div>

      <Header />

      <div className="container3">
        <div className="content-title">
          <font className="content_title_main">실시간 인기상품</font>
          <font className="content_title_sub">지금 쇼핑스타에서 인기있는 상품은?</font>
        </div>
      </div>

      <Link to="/product/add">
        <button className="register-button">상품 등록</button>
      </Link>

      <MainPage products={products} />

      <Routes>
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
