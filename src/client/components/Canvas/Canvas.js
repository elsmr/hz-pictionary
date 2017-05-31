import React from 'react';
import { Button } from 'grommet';
import DownloadIcon from 'grommet/components/icons/base/Download';
import RevertIcon from 'grommet/components/icons/base/Revert';
import RefreshIcon from 'grommet/components/icons/base/Refresh';
import TurnIndicator from '../TurnIndicator/TurnIndicator';
import DrawableCanvas from './DrawableCanvas';
import './Canvas.scss';

class Canvas extends React.Component {
  downloadCanvas(anchor) {
    const download = anchor;
    download.href = this.canvas.toDataURL();
    download.download = 'very-ugly-drawing.png';
  }

  render() {
    const {
      user,
      drawingPlayer,
      word,
      enabled,
      lines,
      settings,
      message,
      undoLine,
      clear,
    } = this.props;

    return (
      <div className="canvas__container">
        <TurnIndicator
          user={user}
          drawingPlayer={drawingPlayer}
          word={word}
        />
        <DrawableCanvas
          onRefReady={(canvas) => { this.canvas = canvas; }}
          enabled={enabled}
          lines={lines}
          settings={settings}
        />
        <div className="canvas__actions">
          {user.id === drawingPlayer.id &&
            <Button
              className="button--undo"
              primary
              icon={<RevertIcon />}
              onClick={() => undoLine()}
            />
          }
          {user.id === drawingPlayer.id &&
            <Button
              className="button--reset"
              primary
              icon={<RefreshIcon />}
              onClick={() => clear()}
            />
          }
          <Button
            className="button--download"
            primary
            icon={<DownloadIcon />}
            href="#"
            onClick={e => this.downloadCanvas(e.currentTarget)}
          />
        </div>
        { message &&
          <div className="canvas__message">
            {message}
          </div>
        }
      </div>
    );
  }
}

export default Canvas;
