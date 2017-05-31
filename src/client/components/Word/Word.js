import React from 'react';
import './Word.scss';

const Word = ({ word }) => (
  word ? (
    <div className="word">
      {`Draw "${word}"`}
    </div>
  ) : null
);

export default Word;
