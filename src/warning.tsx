import React from 'react';
import clsx from 'clsx';
import './warning.css';

const Warning: React.FC<{ message: string; hasError: boolean }> = ({ message, hasError }) => {
  return (
    <div className="Warning">
      <p className={clsx('Warning__message', hasError && 'shouldShow')}>{message}</p>
    </div>
  );
};

export default Warning;
