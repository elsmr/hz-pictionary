import React from 'react';

const PlayerBadge = ({ player, won }) => (
  <div className={`player__badge${won ? ' won' : ''}`}>
    <div className="player__badge__name">
      {player.name}
    </div>
    <div className="player__badge__score">
      {player.score}
    </div>
  </div>
);

export default PlayerBadge;
