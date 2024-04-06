// productPost.js

const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');

// POST 요청을 처리하는 라우트 핸들러
router.post('/', async (req, res) => {
  try {
    // 클라이언트로부터 전송된 데이터를 받습니다.
    const { name, description, price, image_url, category, stock_quantity, sku, brand, shipping_info, discount } = req.body;

    // MySQL에 데이터 삽입 쿼리 작성
    const sql = `INSERT INTO products (name, description, price, image_url, category, stock_quantity, sku, brand, shipping_info, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, description, price, image_url, category, stock_quantity, sku, brand, shipping_info, discount];

    // 쿼리 실행
    await sequelize.query(sql, { replacements: values, type: sequelize.QueryTypes.INSERT });
    
    console.log('Data inserted into MySQL database successfully');
    res.status(200).json({ message: 'Data received and saved to database successfully!' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Error saving data to database' });
  }
});

module.exports = router;
