// Express 및 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');

// 제품 라우트 파일 가져오기
const productPostRoutes = require('./routes/productPost');
const productGetRoutes = require('./routes/productGet'); // productGet.js 파일 추가

// Express 애플리케이션 생성
const app = express();

// CORS 미들웨어 추가
app.use(cors());

// JSON 파싱을 위한 미들웨어 추가
app.use(express.json());

// 제품 POST 라우트 추가
app.use('/api/products/post', productPostRoutes);

// 제품 GET 라우트 추가
app.use('/api/products/get', productGetRoutes); // productGet.js 파일 추가

// Express 애플리케이션을 모듈로 내보내기
module.exports = app;
