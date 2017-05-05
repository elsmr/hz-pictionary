import React from 'react';

const ChatMessage = ({ message }) => (
  <div className="chat__message">
    <div className="chat__message__sender">
      {message.sender}
    </div>
    <div className="chat__message__message">
      {message.message}
    </div>
  </div>
);

export default ChatMessage;
