import React from 'react';

const FullScreenContainer: React.FC = ({ children }) => {
  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh"
      }}
    >
      { children }
    </div>
  );
}

export default FullScreenContainer;