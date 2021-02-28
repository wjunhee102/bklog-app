import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInAsync, signOutAsync, refreshTokenAsync } from '../store/modules/auth/index';

function Home(props: any) {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signInAsync());
  }

  const logOutHandleClick = () => {
    dispatch(signOutAsync());
  }

  const refreshToken = () => {
    dispatch(refreshTokenAsync());
  }

  // useEffect(()=> {
  //   console.log(props.cookies);
  //   setCookie('cert', "dsad", { path: '/'});
  // }, [props.cookies])

  return (
    <div className="home">
      {/* <Form 
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
      /> */}
      <button onClick={handleClick}> 
        로그인
      </button>
      <button onClick={logOutHandleClick}>
        로그아웃
      </button>
      <button onClick={refreshToken}>
        재발행
      </button> 

    </div>
  )
}

export default Home;