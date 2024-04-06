import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  // URL에서 동적으로 전달된 상품 ID를 가져옵니다.
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // productId를 사용하여 해당 상품의 정보를 가져오는 API 호출 등을 수행합니다.
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // 데이터를 로드하는 동안 로딩 상태를 표시합니다.
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} />
      <p>가격: {product.price}원</p>
      <p>할인율: {product.discount}%</p>
      <p>할인 적용 가격: {parseInt(((product.price) * (100 - (product.discount))) / 100)}원</p>
      {/* 기타 상품 정보를 여기에 추가할 수 있습니다. */}
    </div>
  );
}

export default ProductDetail;
