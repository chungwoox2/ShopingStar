import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Main from './pages/Main';
import ProductForm from './pages/ProductForm';
import ProductDetail from './pages/ProductDetail';
import MyPage from './pages/mypage'; 
import Cart from './pages/cart'; 
import SignUpForm from './pages/SignUpForm'; 
import './styles/App.css'; 

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
      <Header />

      <div className="container3">
        <div className="content-title">
          <font className="content_title_main">실시간 인기상품</font>
          <font className="content_title_sub">지금 쇼핑스타에서 인기있는 상품은?</font>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Main products={products} />} />
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/products/detail/:id" element={<ProductDetail />} />
        <Route path="/mypage" element={<MyPage />} /> {/* MyPage 컴포넌트 라우트 */}
        <Route path="/cart" element={<Cart />} /> {/* Cart 컴포넌트 라우트 */}
        <Route path="/signup" element={<SignUpForm />} /> {/* Cart 컴포넌트 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;
