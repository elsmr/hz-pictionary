import React from 'react';
import './TurnIndicator.scss';

const TurnIndicator = ({ user, drawingPlayer, word }) => (
  <div className="turn-indicator">
    { drawingPlayer.id === user.id
      ? `Your turn! draw "${word}"`
      : `${drawingPlayer.name} is drawing! Make a guess`
    }
  </div>
);

export default TurnIndicator;
