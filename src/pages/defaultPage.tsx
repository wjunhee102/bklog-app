import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DefaultPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      asdasd
    </div>
  );
}

export default DefaultPage;