import React from 'react';
import './TurnIndicator.scss';

const TurnIndicator = ({ user, drawingPlayer }) => (
  <div className="turn-indicator">
    { drawingPlayer.id === user.id
      ? 'Your turn!'
      : `${drawingPlayer.name}'s turn`
    }
  </div>
);

export default TurnIndicator;
