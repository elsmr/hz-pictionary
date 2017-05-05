import React from 'react';
import { connect } from 'react-redux';
import { startWatchingRoom, stopWatchingRoom } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import DrawableCanvas from '../../components/Canvas/DrawableCanvas';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import './Room.scss';

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
    const { room, user } = this.props;

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
            enabled
            lines={room.canvas.data}
            settings={user.drawingSettings}
          />
          <Chat
            messages={room.chat}
            enabled={!!room.participants.find(p => p.id === user.id)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, { startWatchingRoom, stopWatchingRoom })(Room);
