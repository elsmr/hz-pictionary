import React from 'react';
import { connect } from 'react-redux';
import { startWatchingRoom, stopWatchingRoom } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';

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
    const { match: { params: { roomId } }, room } = this.props;

    if (room.isLoading) {
      return <PageSpinner />;
    }
    return (
      <div>
        Room: { roomId }
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps, { startWatchingRoom, stopWatchingRoom })(Room);
