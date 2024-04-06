const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');

// GET 요청을 처리하는 라우트 핸들러
router.get('/', async (req, res) => {
  try {
    // MySQL에서 제품 목록을 가져오는 쿼리 작성
    const sql = `SELECT * FROM products`;

    // 쿼리 실행
    const products = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

    // 제품 목록을 클라이언트에게 응답
    res.status(200).json(products);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Error fetching product list from database' });
  }
});

// 다른 유형의 요청에 대해 필요한 다른 라우트 핸들러를 여기에 추가할 수 있습니다.

module.exports = router;
