import React from 'react';
import GnbComponent from './GnbComponent';
import useGnbConnectStore from './hooks/useGnbConnectStore';

interface GnbProps {
  className?: string;
}

const Gnb: React.FC<GnbProps> = ({
  className
}) => {
  return <GnbComponent className={className} useConnectStore={useGnbConnectStore()} />;
}

export default Gnb;