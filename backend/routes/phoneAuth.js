const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const twilio = require('twilio');

// Twilio 설정
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// 휴대폰 번호로 인증 코드 전송
router.post('/send-code', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // 휴대폰 번호를 이용하여 6자리의 랜덤한 인증 코드 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Twilio를 사용하여 SMS 전송
    const message = await client.messages.create({
      body: `인증 코드는 ${verificationCode} 입니다.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    

    // 데이터베이스에 인증 코드 저장 (sequelize를 사용하여 저장)
    const newVerificationCode = await VerificationCode.create({
      phone_number: phoneNumber,
      code: verificationCode
    });

    res.json({ success: true, message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

// 인증 코드 확인
router.post('/verify-code', async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    // 데이터베이스에서 해당 휴대폰 번호의 최신 인증 코드 가져오기
    const latestVerificationCode = await VerificationCode.findOne({
      where: { phone_number: phoneNumber },
      order: [['created_at', 'DESC']]
    });

    if (!latestVerificationCode || latestVerificationCode.code !== code) {
      // 인증 코드가 일치하지 않는 경우
      return res.json({ success: false, message: 'Invalid verification code' });
    }

    // 인증 코드 일치
    res.json({ success: true, message: 'Verification code verified successfully' });
  } catch (error) {
    console.error('Error verifying verification code:', error);
    res.status(500).json({ error: 'Failed to verify verification code' });
  }
});

module.exports = router;
