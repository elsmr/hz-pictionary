import React from 'react';

const ChatMessage = ({ message, mine }) => (
  <div className={`chat__message${mine ? ' chat__message--mine' : ''}`}>
    <div className="chat__message__sender">
      {message.sender}
    </div>

    <div className="chat__message__message">
      {message.message}
    </div>
  </div>
);

export default ChatMessage;
