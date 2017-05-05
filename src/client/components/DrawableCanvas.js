import React from 'react';
import { connect } from 'react-redux';
import { startWatchingCanvas, stopWatchingCanvas } from '../redux/actions';
import { CanvasDrawer } from '../lib/canvas';
import './DrawableCanvas.scss';

class DrawableCanvas extends React.Component {
  componentDidMount() {
    const { startWatchingCanvas, enabled } = this.props;
    if (enabled) {
      startWatchingCanvas(this.canvas);
    }

    this.drawer = new CanvasDrawer(this.canvas);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lines) {
      this.drawer.renderLines(nextProps.lines);
    }
  }

  componentWillUnmount() {
    const { stopWatchingCanvas } = this.props;
    stopWatchingCanvas();
  }

  render() {
    return (
      <div className="canvas__container">
        <canvas className="canvas" ref={(canvas) => { this.canvas = canvas; }} width="1024" height="640" />
      </div>
    );
  }
}

export default connect(null, { startWatchingCanvas, stopWatchingCanvas })(DrawableCanvas);
