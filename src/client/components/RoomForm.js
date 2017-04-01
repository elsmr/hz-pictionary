import React from 'react';
import { Button, TextInput } from 'grommet';

const RoomForm = ({ onChange, onSubmit }) => (
  <div className="room-form">
    <TextInput
      onDOMChange={e => onChange(e)}
    />
    <Button
      className="room-form__button"
      label="Create room"
      onClick={e => onSubmit(e)}
      primary
    />
  </div>
);

RoomForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default RoomForm;
