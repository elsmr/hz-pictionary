import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Notification, Button } from 'grommet';
import PlayIcon from 'grommet/components/icons/base/Play';
import PauseIcon from 'grommet/components/icons/base/Pause';
import SettingsIcon from 'grommet/components/icons/base/SettingsOption';
import { startWatchingRoom, stopWatchingRoom, logout, sendMessage, addParticipant, clearRoom, startGame, pauseGame } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import DrawableCanvas from '../../components/Canvas/DrawableCanvas';
import Header from '../../components/Header/Header';
import Chat from '../../components/Chat/Chat';
import PlayerBadge from '../../components/PlayerBadge/PlayerBadge';
import TurnIndicator from '../../components/TurnIndicator/TurnIndicator';
import './Room.scss';

class Room extends React.Component {
  constructor(props) {
    super(props);
    const { startWatchingRoom, match: { params: { roomId } } } = props;
    startWatchingRoom(roomId);
  }

  componentWillUnmount() {
    const { stopWatchingRoom, clearRoom, match: { params: { roomId } } } = this.props;
    clearRoom();
    stopWatchingRoom(roomId);
  }

  render() {
    const { room, logout, user, sendMessage, addParticipant, startGame, pauseGame } = this.props;
    const isParticipant = !!room.participants.find(p => p.id === user.id);
    const isCreator = user.id === room.creator.id;
    const isDrawingPlayer = user.id === room.game.drawingPlayer.id;
    const isFull = room.config.maxPlayers <= room.participants.length;

    if (user.authPending) {
      return <PageSpinner size="huge" />;
    } else if (!user.isAuthorized) {
      return <Redirect to="/" />;
    }
    return (
      <div className="app-wrapper">
        <div>
          <Header
            user={user}
            onLogout={logout}
          />
        </div>
        {!isParticipant && isFull &&
          <div className="row">
            <Notification
              status="warning"
              message="The room is full 😢"
            />
          </div>
        }
        <div className="row row--extra-margin">
          <div className="player__badges">
            {
              room.participants.map(player =>
                <PlayerBadge
                  key={player.id}
                  player={player}
                  won={player.id === room.game.winner.id}
                />
              )
            }
          </div>
          { room.started && room.game.drawingPlayer &&
            <TurnIndicator
              user={user}
              drawingPlayer={room.game.drawingPlayer}
              word={room.game.currentWord}
            />
          }
        </div>
        <div className="row">
          <div>
            {!isParticipant && !isFull &&
              <div>
                <Button
                  label="Join this room"
                  primary
                  onClick={() => addParticipant(user)}
                />
              </div>
            }
            {isCreator && !room.started && room.participants.length > 1 &&
              <div>
                <Button
                  label="Start the game"
                  primary
                  icon={<PlayIcon />}
                  onClick={() => startGame()}
                />
              </div>
            }
            {isCreator && room.started && room.participants.length > 1 &&
              <div>
                <Button
                  label="Pause the game"
                  secondary
                  icon={<PauseIcon />}
                  onClick={() => pauseGame()}
                />
              </div>
            }
          </div>
          <div>
            { true &&
              <div>
                <Button
                  icon={<SettingsIcon />}
                  primary
                  onClick={() => pauseGame()}
                />
              </div>
            }
          </div>
        </div>
        <div className="row room__container">
          <DrawableCanvas
            enabled={room.started && isDrawingPlayer}
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
  clearRoom,
  startGame,
  pauseGame,
})(Room);
