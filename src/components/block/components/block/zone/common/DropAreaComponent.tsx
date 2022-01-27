import React, { useEffect } from 'react';
import classNames from "classnames";

interface DropAreaComponentProps {
  on: boolean;
  dropDirection: string;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
}

const DropAreaComponent: React.FC<DropAreaComponentProps> = ({
  on,
  dropDirection,
  onMouseEnter,
  onMouseLeave,
  onMouseUp
}) => {
  useEffect(() => {
    console.log(on);
  }, [on]);

  return (
    <div 
      className={classNames(
        `drop-area ${dropDirection}-drop-area`,
        { on }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      <div className="drop-area-box"></div>
    </div>
  );
}

export default DropAreaComponent;