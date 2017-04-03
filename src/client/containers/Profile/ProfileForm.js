import React from 'react';
import { connect } from 'react-redux';
import { Button, TextInput } from 'grommet';
import { setUsername } from '../../redux/actions';

const isValid = name => name.length > 3;

const handleChange = (action, value) => {
  if (isValid(value)) {
    action(value);
  }
};

const ProfileForm = ({ setUsername, disabled, onSubmit, profileForm: { name } }) => (
  <div className="room-form">
    <TextInput
      onDOMChange={e => handleChange(setUsername, e.target.value.toLowerCase())}
      disabled={disabled}
    />
    <Button
      className="room-form__button"
      label="Create room"
      onClick={() => onSubmit(name)}
      disabled={disabled || !isValid(name)}
      primary
    />
  </div>
);

ProfileForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ profileForm: state.profileForm });

export default connect(mapStateToProps, { setUsername })(ProfileForm);
