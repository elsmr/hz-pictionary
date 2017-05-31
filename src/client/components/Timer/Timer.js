import React from 'react';
import './Timer.scss';

const getColorForValue = (value, max = 60.0) => {
  const weighted = (value / max) * 150;
  if (weighted > 40) {
    return '#000';
  }
  return `hsl(${weighted}, 100%, 50%)`;
};

const Timer = ({ seconds }) => (
  <div className="timer" style={{ color: getColorForValue(seconds) }}>
    {seconds}s left
  </div>
);

export default Timer;
