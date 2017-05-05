import React from 'react';

const CanvasControls = ({ settings, onChanges }) => (
  <div className="canvas__controls" onDrag={e => onChanges(e)}>
    {
      settings.color
    }
  </div>
);

export default CanvasControls;
