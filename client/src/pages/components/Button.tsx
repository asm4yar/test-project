import React, { memo } from 'react';

const Button: React.FC<any> = ({ onClick, id, disabled, children }) => {
  return (
    <button onClick={(e) => onClick(e)} disabled={disabled}>
      {children}
    </button>
  );
};

export default memo(Button);