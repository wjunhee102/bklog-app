import React from 'react';
import { Link } from 'react-router-dom';
import Portfolio from '../../components/portfolio';
import useHomePage from './hooks/useHomePage';

const Home: React.FC = () => {
  
  useHomePage();

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