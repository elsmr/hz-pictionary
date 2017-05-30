import React from 'react';
import './PlayerBadge.scss';

const PlayerBadge = ({ player, won }) => (
  <div className="player__badge__container">
    { won &&
      <svg preserveAspectRatio="xMidYMid meet" className="crown">
        <path fill="gold">
          <animate
            attributeName="d"
            dur="1440ms"
            repeatCount="indefinite"
            values="M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;M 30,110 L 0,0 L 50,50 L 70,0 L 90,50 L 140,0 L 110,110 z;M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;"
          />
        </path>
      </svg>
    }
    <div className={`player__badge${won ? ' won' : ''}`}>
      <div className="player__badge__name">
        { won ? `🎉 ${player.name}` : player.name}
      </div>
      <div className="player__badge__score">
        {player.score}
      </div>
    </div>
  </div>
);

export default PlayerBadge;
