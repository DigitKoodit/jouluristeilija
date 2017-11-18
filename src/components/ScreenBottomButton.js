import React from 'react';
import './ScreenBottomButton.css';

const ScreenBottomButton = (props) => {
  const { action, label } = props;
  return (
    <div className="ScreenBottomButton">
      <button onClick={action}>{label}</button>
    </div>
  );
}

export default ScreenBottomButton;
