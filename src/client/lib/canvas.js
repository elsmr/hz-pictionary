
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/throttleTime';
import { DEFAULT_DRAWING_SETTINGS } from '../constants';

export const mouseEventStream = (canvas) => {
  const mouseDown$ = Observable.fromEvent(canvas, 'mousedown');
  const mouseMove$ = Observable.fromEvent(canvas, 'mousemove');
  const mouseUp$ = Observable.fromEvent(canvas, 'mouseup');

  return mouseDown$
      .switchMap(mouseDownEvent =>
        mouseMove$
          .throttleTime(16)
          .startWith(mouseDownEvent, mouseDownEvent)
          .pairwise()
          .map(events => this.mapEventsToLine(events))
          .takeUntil(mouseUp$)
      );
};

export class CanvasDrawer {
  constructor(canvas, options = DEFAULT_DRAWING_SETTINGS) {
    const { width, color } = options;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
  }

  setColor(color) {
    this.ctx.strokeStyle = color;
  }

  setLineWidth(width) {
    this.ctx.lineWidth = width;
  }

  renderLines(lines = []) {
    this.clear();
    this.ctx.beginPath();
    lines.forEach((line) => {
      if (line.width !== this.ctx.lineWidth) {
        this.ctx.lineWidth = line.width;
      }
      if (line.color !== this.ctx.strokeStyle) {
        this.ctx.strokeStyle = line.color;
      }
      this.drawLine(line.points);
    });
    this.ctx.stroke();
  }

  drawLine(points) {
    const [p1, p2] = points;
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  mapEventsToLine(events) {
    const points = events.map(event => ({
      x: (event.clientX - this.boundingRect.left) * this.scaleX,
      y: (event.clientY - this.boundingRect.top) * this.scaleY,
    }));

    return {
      width: this.ctx.lineWidth,
      color: this.ctx.strokeStyle,
      points,
    };
  }

  get boundingRect() {
    return this.canvas.getBoundingClientRect();
  }

  get scaleX() {
    return this.canvas.width / this.boundingRect.width;
  }

  get scaleY() {
    return this.canvas.height / this.boundingRect.height;
  }
}
