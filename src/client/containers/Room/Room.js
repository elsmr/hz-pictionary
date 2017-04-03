import React from 'react';
import { connect } from 'react-redux';
import { startWatchingRoom, stopWatchingRoom } from '../../redux/actions';

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
    const { match: { params: { roomId } } } = this.props;
    return (
      <div>
        Room: { roomId }
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, { startWatchingRoom, stopWatchingRoom })(Room);
