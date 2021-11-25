import React from 'react';
import GnbComponent from './GnbComponent';
import useGnbConnectStore from './hooks/useGnbConnectStore';

const Gnb: React.FC = () => {
  return <GnbComponent useConnectStore={useGnbConnectStore()} />;
}

export default Gnb;