// ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock_quantity: '',
    sku: '',
    brand: '',
    shipping_info: '',
    discount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products/post', formData);
      console.log(response.data);
      // 등록 성공 시 알림 또는 리디렉션
    } catch (error) {
      console.error('Error:', error); 
      // 오류 발생 시 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="form-container">
      <h2>상품등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>상품명:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>상품 상세설명:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>가격:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>카테고리:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>재고 수량:</label>
          <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>SKU:</label>
          <input type="text" name="sku" value={formData.sku} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>브랜드:</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>배송예정일:</label>
          <input type="text" name="shipping_info" value={formData.shipping_info} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>할인율:</label>
          <input type="text" name="discount" value={formData.discount} onChange={handleChange} />
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
