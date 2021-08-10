import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Portfolio from '../components/portfolio';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div>
        <Link to="/bklog">
          bklog 이동
        </Link>
      </div>
      <div>
        <Portfolio />
      </div>
    </div>
  )
}

export default Home;