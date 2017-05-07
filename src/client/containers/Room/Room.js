import React from 'react';
import { connect } from 'react-redux';
import { Notification, Button } from 'grommet';
import { startWatchingRoom, stopWatchingRoom, logout, sendMessage, addParticipant } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import DrawableCanvas from '../../components/Canvas/DrawableCanvas';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import './Room.scss';

class Room extends React.Component {
  constructor(props) {
    super(props);
    const { startWatchingRoom, match: { params: { roomId } } } = props;
    startWatchingRoom(roomId);
  }

  componentWillUnmount() {
    const { stopWatchingRoom, match: { params: { roomId } } } = this.props;
    stopWatchingRoom(roomId);
  }

  render() {
    const { room, logout, user, sendMessage, addParticipant } = this.props;
    const isParticipant = !!room.participants.find(p => p.id === user.id);
    const isFull = room.config.maxPlayers <= room.participants.length;

    if (user.authPending) {
      return <PageSpinner size="huge" />;
    }
    return (
      <div className="app-wrapper">
        <div>
          <Header
            user={user}
            onLogout={logout}
          />
        </div>
        <div>
          { !isParticipant && isFull &&
            <Notification
              status="warning"
              message="The room is full 😢"
            />
          }
        </div>
        <div>
          {
            room.participants.map(p =>
              <p>{p.name}</p>
            )
          }
        </div>
        { !isParticipant && !isFull &&
          <div>
            <Button
              label="Join this room"
              style={{ marginTop: '1em', width: '100%' }}
              primary
              onClick={() => addParticipant(user)}
            />
          </div>
        }
        <div className="room__container">
          <DrawableCanvas
            enabled
            lines={room.canvas.data}
            settings={user.drawingSettings}
          />
          <Chat
            user={user}
            onMessage={message => sendMessage(message)}
            messages={room.chat}
            enabled={isParticipant}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, {
  startWatchingRoom,
  stopWatchingRoom,
  logout,
  sendMessage,
  addParticipant,
})(Room);
