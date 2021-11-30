import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BkPageSwitchComponent from '../components/BkPageSwitchComponent';

interface MatchParams {
  userInfo: string;
}

const PenNameRoute: React.FC<RouteComponentProps<MatchParams>> = ({
  match: {
    params: { userInfo }
  }
}) => {
  return <BkPageSwitchComponent type="penname" userInfo={userInfo} />;
}

export default PenNameRoute;