import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startWatchingRoom, stopWatchingRoom } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import DrawableCanvas from '../../components/DrawableCanvas';
import Header from '../../components/Header';

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

    if (room.loading) {
      return <PageSpinner />;
    } else if (!user.isAuthorized && !user.authPending) {
      return <Redirect to="/" />;
    }
    return (
      <div className="app-wrapper">
        <div>
          <Header
            user={user}
          />
        </div>
        <DrawableCanvas
          enabled={user.id === room.game.drawingPlayer.id || true}
          lines={room.canvas.data}
        />
        <p>Room: { roomId }</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, { startWatchingRoom, stopWatchingRoom })(Room);
