// Express 및 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const path = require('path');

// 제품 라우트 파일 가져오기
const productPostRoutes = require('./routes/productPost');
const productGetRoutes = require('./routes/productGet'); // productGet.js 파일 추가


const app = express();


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '/build')));

app.use('/api/products/post', productPostRoutes);
app.use('/api/products/get', productGetRoutes); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });

module.exports = app;
