import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockEditor from '../components/block';
import Portfolio from '../components/portfolio';

const Home: React.FC = () => {
  return (
    <div className="home overflow-auto h-full">
      <div className="portfolio-container">
        <Portfolio />
      </div>
      <div>
        <Link to="/bklog">
          bklog 이동
        </Link>
      </div>
    </div>
  )
}

export default Home;