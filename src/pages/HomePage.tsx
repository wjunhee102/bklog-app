import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home(props: any) {


  // useEffect(()=> {
  //   console.log(props.cookies);
  //   setCookie('cert', "dsad", { path: '/'});
  // }, [props.cookies])

  return (
    <div className="home">
      <Link to="/bklog">
        bklog 이동
      </Link>

    </div>
  )
}

export default Home;