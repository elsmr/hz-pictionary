import React from 'react';
import { connect } from 'react-redux';
import { startWatchingCanvas, stopWatchingCanvas, setDrawingSettings } from '../../redux/actions';
import { CanvasDrawer } from '../../lib/canvas';
import CanvasControls from './CanvasControls';
import './DrawableCanvas.scss';

class DrawableCanvas extends React.Component {
  componentDidMount() {
    this.drawer = new CanvasDrawer(this.canvas);
    if (this.props.enabled) {
      this.props.startWatchingCanvas(this.canvas);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lines) {
      this.drawer.renderLines(nextProps.lines);
    }
    if (nextProps.settings) {
      this.drawer.setColor(nextProps.settings.color);
      this.drawer.setLineWidth(nextProps.settings.width);
    }
    if (!this.props.enabled && nextProps.enabled) {
      nextProps.startWatchingCanvas(this.canvas);
    } else if (this.props.enabled && !nextProps.enabled) {
      nextProps.stopWatchingCanvas();
    }
  }

  componentWillUnmount() {
    const { stopWatchingCanvas } = this.props;
    stopWatchingCanvas();
  }

  render() {
    const { setDrawingSettings, enabled, settings } = this.props;
    return (
      <div className="canvas__container">
        <div>
          <canvas className={`canvas${enabled ? ' drawable' : ''}`} ref={(canvas) => { this.canvas = canvas; }} width="1920" height="1440" />
        </div>
        <CanvasControls
          settings={settings}
          onChanges={settings => setDrawingSettings(settings)}
        />
      </div>
    );
  }
}

export default connect(null, {
  startWatchingCanvas,
  stopWatchingCanvas,
  setDrawingSettings,
})(DrawableCanvas);
