import React, { useEffect } from 'react';
import Form from '../components/Form';
import Blocklog from '../components/bklog/Blocklog';
import { useDispatch } from 'react-redux';
import { signInAsync } from '../store/modules/auth/index';
import { useCookies, withCookies } from 'react-cookie';

function Home(props: any) {
  const [cookie, setCookie] = useCookies(["cert"]);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signInAsync());
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
      <Blocklog />
      <button onClick={handleClick}> 
        테스트
      </button>
    </div>
  )
}

export default withCookies(Home);