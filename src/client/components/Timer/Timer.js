import React from 'react';
import './Timer.scss';

const getColorForValue = (value, max = 60.0) => {
  if (value > 20) {
    return '#000';
  }
  const weighted = (value / max) * 150;
  return `hsl(${weighted}, 100%, 50%)`;
};

const Timer = ({ seconds }) => (
  <div className="timer" style={{ color: getColorForValue(seconds) }}>
    {
      seconds > 0 ? `${seconds}s left` : 'Time\'s up!'
    }

  </div>
);

export default Timer;
