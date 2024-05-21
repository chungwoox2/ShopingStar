import React from 'react';
import PhoneAuth from './PhoneAuth'; // PhoneAuth 컴포넌트 임포트
import axios from 'axios';

const SignUpForm = () => {
  const handleSignUp = async (phoneNumber) => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { phoneNumber });
      console.log(response.data);
      // TODO: 회원가입 성공 처리
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input type="text" placeholder="이름" />
      <input type="email" placeholder="이메일" />
      {/* 휴대폰 인증 컴포넌트 */}
      <PhoneAuth onSignUp={handleSignUp} />
      <button>가입하기</button>
    </div>
  );
};

export default SignUpForm;
