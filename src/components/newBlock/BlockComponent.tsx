import React from 'react';
import useBlock from './hooks/useBlock';
import BlockEditor from './BlockEditor';
import useConnectRedux from './hooks/useConnectRedux';

const BlockComponent: React.FC = () => {
  const useBlockReducer = useBlock();
  const { updated } = useConnectRedux(useBlockReducer);

  return <BlockEditor useBlockReducer={useBlockReducer} updated={updated} />
}

export default BlockComponent;