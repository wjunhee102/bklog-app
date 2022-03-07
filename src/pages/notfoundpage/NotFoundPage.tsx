import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-container gradient">
        <h1>404</h1>
        <h2>페이지가 존재하지 않습니다.</h2>
        <Link to="/home">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;