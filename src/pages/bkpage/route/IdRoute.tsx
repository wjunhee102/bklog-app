import React from 'react';
import { RouteComponentProps} from 'react-router-dom';
import BkPageSwitchComponent from '../components/BkPageSwitchComponent';

interface MatchParams {
  userInfo: string;
}

const IdRoute: React.FC<RouteComponentProps<MatchParams>> = ({
  match: {
    params: { userInfo }
  }
}) => {
  return <BkPageSwitchComponent type="id" userInfo={userInfo} />
}

export default IdRoute;