import React from 'react';
import { connect } from 'react-redux';
import { startWatchingCanvas, stopWatchingCanvas } from '../../redux/actions';
import { CanvasDrawer } from '../../lib/canvas';
import './DrawableCanvas.scss';

class DrawableCanvas extends React.Component {
  componentDidMount() {
    const { lines } = this.props;

    this.drawer = new CanvasDrawer(this.canvas);
    this.drawer.renderLines(lines || []);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lines) {
      this.drawer.renderLines(nextProps.lines);
    }
    if (nextProps.enabled && !this.props.enabled) {
      this.props.startWatchingCanvas(this.canvas);
    } else if (!nextProps.enabled && this.props.enabled) {
      this.props.stopWatchingCanvas(this.canvas);
    }
  }

  componentWillUnmount() {
    const { stopWatchingCanvas } = this.props;
    stopWatchingCanvas();
  }

  render() {
    const { enabled } = this.props;
    return (
      <div className="canvas__container">
        <canvas className={`canvas${enabled ? ' drawable' : ''}`} ref={(canvas) => { this.canvas = canvas; }} width="1920" height="1080" />
      </div>
    );
  }
}

export default connect(null, { startWatchingCanvas, stopWatchingCanvas })(DrawableCanvas);
