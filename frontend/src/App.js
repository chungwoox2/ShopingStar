import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './pages/ProductForm';
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  // 상품 목록을 담을 상태 정의
  const [products, setProducts] = useState([]);
  
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정
  useEffect(() => {
    // 상품 목록을 가져오는 함수 정의
    const fetchProducts = async () => {
      try {
        // API를 호출하여 상품 목록을 가져옴
        const response = await fetch('http://localhost:5000/api/products/get');
        const data = await response.json();
        // 가져온 상품 목록을 상태에 저장
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    // fetchProducts 함수 호출
    fetchProducts();
  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  return (
    <Router>
      <div className='login'>
        로그인
        <span className='sign-up'>회원가입</span>
      </div>

      <div className="container">
        <div className='container2'>
        <span><img src="/images/logo_text4.png" alt="" className="logo-image" /></span>

        <div className='border'>
          <input 
            type="text" 
            className="search-input"
            placeholder="찾고 싶은 상품을 검색해보세요!" 
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        </div>

        <div className='button-right'>
        <Link to="/mypage">
          <button className="button-mypage">
            <FontAwesomeIcon icon={faUser} />
            마이페이지
          </button>
        </Link>
        <Link to="/cart">
          <button className="button-cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            장바구니
          </button>
        </Link>
      </div>
      </div>
      
      <div className='container3'>
        <div className='content-title'>
          <font className="content_title_main">실시간 인기상품</font>
          <font className="content_title_sub">지금 쇼핑스타에서 인기있는 상품은?</font>
        </div>
      </div>
      <Link to="/product/add">
        <button className="register-button">상품 등록</button>
      </Link>
      <Container>
        <Row>
          {/* 상품 목록을 매핑하여 화면에 표시 */}
          {products.map(product => {
            // 각 상품에 대한 배송 날짜를 계산
            const currentDate = new Date(); // 현재 날짜를 가져옴
            const year = currentDate.getFullYear(); // 현재 연도
            const month = currentDate.getMonth(); // 현재 월 (0부터 시작)
            const day = currentDate.getDate(); // 현재 일
            const shippingDate = new Date(year, month, day + product.shipping_info);
            const days = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
            const dayOfWeek = days[shippingDate.getDay()]; // 요일 가져오기
            
            return (
              <Col key={product.id} lg={3} md={6} sm={12}>
                <div className="product-item">
                  <img src={product.image_url} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-discount">
                      {parseInt(product.discount)}% <span className="product-price">{parseInt(product.price).toLocaleString()}원</span>
                    </div>
                    <div className="discounted-price">
                      {parseInt(((product.price) * (100 - (product.discount))) / 100).toLocaleString()}원
                    </div>
                    {/* weight_amount 또는 volume_amount가 존재하는 경우 계산하여 화면에 표시 */}
                    {product.weight_amount && (
                      <div className="unit-price">
                        {product.weight_amount <= 500
                          ? `10g당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.weight_amount *10).toLocaleString()}원`
                          : `100g당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.weight_amount *100).toLocaleString()}원`
                        }
                      </div>
                    )}
                    {product.volume_amount && (
                    <div className="unit-price">
                      {product.volume_amount <= 100
                        ? `10ml당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.volume_amount * 10).toLocaleString()}원`
                        : `100ml당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.volume_amount * 100).toLocaleString()}원`
                      }
                    </div>
                      )}
                    <div className="product-delivery-date">
                      {shippingDate.getMonth() + 1}월 {shippingDate.getDate()}일 ({dayOfWeek})도착예정
                    </div>
                    <div>{currentDate.getMonth() + 1}월 {currentDate.getDate()}일</div>
                    <div>{year},{month},{currentDate + product.shipping_info}</div>


                  </div>
                </div>
              </Col>
            );
            
            
          })}
        </Row>
      </Container>

      <Routes>
        <Route path="/product/add" element={<ProductForm />} />
        {/* 마이페이지와 장바구니에 대한 Route 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
