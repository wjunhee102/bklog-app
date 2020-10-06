import React from 'react';
import Form from '../components/Form';

function Home() {
  return (
    <div className="home">
      <Form 
        formType="number"
        errorMessage="숫자를 입력해주세요."
      />
      <Form 
        formType="text"
        errorMessage="문자를 입력해주세요."
      />
      <Form 
        formType="password"
        errorMessage="비밀번호를 입력해주세요."
      />
    </div>
  )
}

export default Home;