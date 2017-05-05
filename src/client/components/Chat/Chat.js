import React from 'react';
import { Button, TextInput } from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import ChatMessage from './ChatMessage';

const Chat = ({ messages, enabled }) => (
  <div className="chat__container">
    <div className="chat__container__messages">
      {
        messages && messages.length > 0
        ? (
          messages.map(message => <ChatMessage key={`${message.date}${message.sender}`} message={message} />)
        ) : (
          <Spinning />
        )
      }
    </div>
    { enabled &&
      <div className="chat__container__form">
        <form action="">
          <TextInput
            onDOMChange={e => e}
            placeHolder="Type a message..."
          />
          <Button
            className="form__button"
            label="Send"
            onClick={() => null}
            primary
            type="submit"
          />
        </form>
      </div>
    }
  </div>
);

export default Chat;
