import React, { useState } from 'react';
import axios from 'axios';

const PhoneAuth = ({ onSignUp }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-code', { phoneNumber });
      console.log(response.data);
      setIsCodeSent(true);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-code', { phoneNumber, verificationCode });
      console.log(response.data);
      if (response.data.success) {
        // 인증 성공 시 부모 컴포넌트로 이벤트 전달
        if (onSignUp) {
          onSignUp(phoneNumber);
        }
      } else {
        console.error('Verification code is incorrect.');
      }
    } catch (error) {
      console.error('Error verifying verification code:', error);
    }
  };

  return (
    <div>
      <h2>휴대폰 인증</h2>
      <input
        type="text"
        placeholder="휴대폰 번호 입력"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {!isCodeSent ? (
        <button onClick={handleSendCode}>인증 코드 전송</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="인증 코드 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>인증 확인</button>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
