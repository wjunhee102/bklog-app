import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import classNames from 'classnames';

import BklogContainer from '../containers/BklogContainer';

interface MatchParams {
  id: string;
}

function BkPage({ match }: RouteComponentProps<MatchParams>) {

  const [ mode, setMode ] = useState<boolean>(true);

  console.log(match.params.id, match);

  return (
    <div className={classNames("bk-page", {"white-mode": mode})}>
      <BklogContainer />
    </div>
  );
}

export default BkPage;