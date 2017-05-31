import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Notification, Button, Headline, TextInput } from 'grommet';
import PlayIcon from 'grommet/components/icons/base/Play';
import PauseIcon from 'grommet/components/icons/base/Pause';
import SettingsIcon from 'grommet/components/icons/base/SettingsOption';
import { startWatchingRoom, stopWatchingRoom, logout, sendMessage, addParticipant, clearRoom, startGame, pauseGame, resumeGame } from '../../redux/actions';
import PageSpinner from '../../components/PageSpinner';
import Canvas from '../../components/Canvas/Canvas';
import Header from '../../components/Header/Header';
import Chat from '../../components/Chat/Chat';
import PlayerBadge from '../../components/PlayerBadge/PlayerBadge';
import Timer from '../../components/Timer/Timer';
import Word from '../../components/Word/Word';
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
    const {
      room,
      logout,
      user,
      sendMessage,
      addParticipant,
      startGame,
      pauseGame,
      resumeGame,
    } = this.props;
    const isParticipant = !!room.participants.find(p => p.id === user.id);
    const isCreator = user.id === room.creator.id;
    const isDrawingPlayer = user.id === room.game.drawingPlayer.id;
    const isFull = room.config.maxPlayers <= room.participants.length;
    const enoughPlayers = room.participants.length > 1;
    const inProgress = room.started && !room.paused;

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
          <div className="actions">
            { isDrawingPlayer &&
              <Word word={room.game.currentWord} />
            }
            { inProgress &&
              <Timer seconds={room.timer} />
            }
            {isCreator && !room.started && enoughPlayers &&
              <div>
                <Button
                  label="Start"
                  primary
                  icon={<PlayIcon />}
                  onClick={() => startGame()}
                />
              </div>
            }
            {isCreator && room.started && room.paused && enoughPlayers &&
              <div>
                <Button
                  label="Resume"
                  primary
                  icon={<PlayIcon />}
                  onClick={() => resumeGame()}
                />
              </div>
            }
            { isCreator && inProgress &&
              <div>
                <Button
                  label="Pause"
                  secondary
                  icon={<PauseIcon />}
                  onClick={() => pauseGame()}
                />
              </div>
            }
            { !room.started && isCreator &&
              <Button
                icon={<SettingsIcon />}
                primary
                onClick={() => pauseGame()}
              />
            }
          </div>
        </div>
        { inProgress &&
          <div className="row room__container">
            <Canvas
              enabled={room.started && isDrawingPlayer}
              lines={room.canvas.data}
              settings={user.drawingSettings}
              user={user}
              drawingPlayer={room.game.drawingPlayer}
              word={room.game.currentWord}
            />
            <Chat
              user={user}
              onMessage={message => sendMessage(message)}
              messages={room.chat}
              enabled={isParticipant}
            />
          </div>
        }
        { !enoughPlayers && isCreator &&
          <div>
            <Headline size="small" align="center">
              Not enough players to start the game <span role="img" aria-label="sad">😔</span>.
            </Headline>
            <div style={{ textAlign: 'center' }}>
              Invite friends to the game by sharing this link:
              <TextInput style={{ width: 'auto' }} type="text" value={window.location.href} readOnly autoFocus onFocus={e => e.target.select()} />
            </div>
          </div>
        }
        { !room.started && !isParticipant && !isFull &&
          <div>
            <Headline size="small" align="center">
              This room has not started yet and still has open spots <span role="img" aria-label="happy">😁</span>
            </Headline>
            <div style={{ textAlign: 'center' }}>
              <Button
                label="Join"
                primary
                onClick={() => addParticipant(user)}
              />
            </div>
          </div>
        }
        { room.paused && isParticipant && !isCreator &&
          <Headline size="small" align="center">
            { room.started ? 'The room owner has paused the game...' : 'Waiting for the room owner to start the game'} <span role="img" aria-label="sleepy">😴</span>
          </Headline>
        }
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
  resumeGame,
})(Room);
