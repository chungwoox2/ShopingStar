import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Main = ({ products }) => {
  return (
    <Container>
      <Row>
        {/* 상품 목록을 매핑하여 화면에 표시 */}
        {products.map(product => {
          // 각 상품에 대한 배송 날짜를 계산
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const day = currentDate.getDate();
          const shippingDate = new Date(year, month, day + product.shipping_info);
          const days = ['일', '월', '화', '수', '목', '금', '토'];
          const dayOfWeek = days[shippingDate.getDay()];

          return (
            <Col key={product.id} lg={3} md={6} sm={12}>
              {/* Link 컴포넌트를 사용하여 상품 상세 페이지로 이동 */}
              <Link to={`/products/detail/${product.id}`} style={{ textDecoration: 'none' }}>
              
                <div className="product-item">
                  <img src={product.image_url} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-discount">
                      {parseInt(product.discount)}%{' '}
                      <span className="product-price">{parseInt(product.price).toLocaleString()}원</span>
                    </div>
                    <div className="discounted-price">
                      {parseInt(((product.price) * (100 - (product.discount))) / 100).toLocaleString()}원
                    </div>
                    {product.weight_amount && (
                      <div className="unit-price">
                        {product.weight_amount <= 500
                          ? `10g당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.weight_amount * 10).toLocaleString()}원`
                          : `100g당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.weight_amount * 100).toLocaleString()}원`}
                      </div>
                    )}
                    {product.volume_amount && (
                      <div className="unit-price">
                        {product.volume_amount <= 100
                          ? `10ml당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.volume_amount * 10).toLocaleString()}원`
                          : `100ml당 ${parseInt(((product.price) * (100 - (product.discount))) / 100 / product.volume_amount * 100).toLocaleString()}원`}
                      </div>
                    )}
                    <div className="product-delivery-date">
                      {shippingDate.getMonth() + 1}월 {shippingDate.getDate()}일 ({dayOfWeek})도착예정
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Main;
