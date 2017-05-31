import React from 'react';
import { Button } from 'grommet';
import DownloadIcon from 'grommet/components/icons/base/Download';
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
    const { user, drawingPlayer, word, enabled, lines, settings } = this.props;

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
        <Button
          className="button--download"
          primary
          icon={<DownloadIcon />}
          href="#"
          onClick={e => this.downloadCanvas(e.currentTarget)}
        />
      </div>
    );
  }
}

export default Canvas;
