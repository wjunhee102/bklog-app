import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser, signOutUser } from '../store/modules/auth/index';
import { Link } from 'react-router-dom';

function Home(props: any) {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signInUser({
      email: "admin@admin.com",
      password: "Admin123!"
    }));
  }

  const logOutHandleClick = () => {
    dispatch(signOutUser());
  }

  const refreshToken = () => {
  }

  // useEffect(()=> {
  //   console.log(props.cookies);
  //   setCookie('cert', "dsad", { path: '/'});
  // }, [props.cookies])

  return (
    <div className="home">
      <Link to="/bklog">
        bklog 이동
      </Link>
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