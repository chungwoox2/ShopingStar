import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/detail/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} />
      <p>가격: {parseInt(product.price).toLocaleString()}원</p>
      <p>할인율: {parseInt(product.discount)}%</p>
      <p>할인 적용 가격: {parseInt(((product.price) * (100 - (product.discount))) / 100).toLocaleString()}원</p>
    </div>
  );
}

export default ProductDetail;
