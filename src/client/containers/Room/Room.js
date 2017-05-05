import React from 'react';
import { connect } from 'react-redux';
import { startWatchingRoom, stopWatchingRoom } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import DrawableCanvas from '../../components/DrawableCanvas';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';

class Room extends React.Component {
  constructor(props) {
    super(props);
    const { startWatchingRoom, match: { params: { roomId } }, user } = props;
    if (user.isAuthorized) {
      startWatchingRoom(roomId);
    }
  }

  componentWillUnmount() {
    const { stopWatchingRoom, match: { params: { roomId } } } = this.props;
    stopWatchingRoom(roomId);
  }

  render() {
    const { match: { params: { roomId } }, room, user } = this.props;

    if (user.authPending) {
      return <PageSpinner />;
    }
    return (
      <div className="app-wrapper">
        <div>
          <Header
            user={user}
          />
        </div>
        <div className="room__container">
          <DrawableCanvas
            enabled={user && user.id === room.game.drawingPlayer.id}
            lines={room.canvas.data}
          />
          <Chat
            messages={room.chat}
            enabled={user && room.participants.find(p => p.id === user.id)}
          />
        </div>

        <p>Room: { roomId }</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, { startWatchingRoom, stopWatchingRoom })(Room);
