import React from 'react';
import { Button, TextInput } from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import ChatMessage from './ChatMessage';
import './Chat.scss';

class Chat extends React.Component {
  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, onMessage } = this.props;
    onMessage({
      message: this.messageInput.componentRef.value,
      sender: user.name,
      date: Date.now(),
    });
    this.messageInput.componentRef.value = '';
  }

  render() {
    const { enabled, messages, user } = this.props;
    return (
      <div className="chat__container">
        <div className="chat__container__messages" ref={(container) => { this.container = container; }}>
          {
            messages && messages.length > 0
            ? (
              messages.map(message =>
                <ChatMessage
                  mine={message.sender === user.name}
                  key={message.sender + message.date}
                  message={message}
                />
              )
            ) : (
              <Spinning />
            )
          }
        </div>
        { enabled &&
          <div className="chat__container__form">
            <form className="chat__form" action="">
              <TextInput
                ref={(input) => { this.messageInput = input; }}
                placeHolder="Make a guess..."
              />
              <Button
                className="form__button"
                label="Send"
                onClick={e => this.handleSubmit(e)}
                primary
                type="submit"
              />
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Chat;
