const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');

// GET 요청을 처리하는 라우트 핸들러
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // MySQL에서 해당 제품 정보를 가져오는 쿼리 작성
    const sql = `SELECT * FROM products WHERE id = :productId`;

    // 쿼리 실행
    const product = await sequelize.query(sql, {
      replacements: { productId },
      type: sequelize.QueryTypes.SELECT
    });

    if (product.length === 0) {
      // 해당 제품이 없는 경우
      return res.status(404).json({ error: 'Product not found' });
    }

    // 제품 정보를 클라이언트에게 응답
    res.status(200).json(product[0]);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Error fetching product details from database' });
  }
});

module.exports = router;
