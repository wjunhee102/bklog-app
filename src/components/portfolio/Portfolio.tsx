import React from "react";
import BlockEditor from "../block";
import useConnectEditor from "./hooks/useConnectEditor";
import './portfolio.scss';

const Portfolio: React.FC = () => {

  return (
    <main className="portfolio">
      
      <BlockEditor connectStoreHook={useConnectEditor} />

    </main>
  )
} 

export default Portfolio;