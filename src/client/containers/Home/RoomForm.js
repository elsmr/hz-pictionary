import React from 'react';
import { connect } from 'react-redux';
import { Button, TextInput } from 'grommet';
import { setRoomFormName, setRoomFormState } from '../../redux/actions';
import { FORM_STATES } from '../../constants';
import FormStateIcon from '../../components/FormStateIcon';
import './RoomForm.scss';

const isValid = name => name.length > 3;

const handleChange = (dispatchName, dispatchState, state, value) => {
  if (state !== FORM_STATES.PRISTINE) {
    dispatchState(FORM_STATES.PRISTINE);
  }
  if (isValid(value)) {
    dispatchName(value);
  }
};

const handleSubmit = (action, value, formState) => {
  if (isValid(value) && formState === FORM_STATES.VALID) {
    action(value);
  }
};

const RoomForm = ({
  setRoomFormName,
  setRoomFormState,
  onSubmit,
  roomForm: { name, formState },
}) => (
  <div className="room-form">
    <TextInput
      className="room-form__input"
      onDOMChange={e =>
        handleChange(
          setRoomFormName,
          setRoomFormState,
          formState,
          e.target.value.toLowerCase()
        )
      }
      disabled={formState === FORM_STATES.LOCKED}
    />
    <span className="room-form__state">
      <FormStateIcon state={formState} />
    </span>
    <Button
      className="room-form__button"
      label="Create room"
      onClick={() => handleSubmit(onSubmit, name, formState)}
      disabled={formState === FORM_STATES.LOCKED || !isValid(name)}
      primary
    />
  </div>
);

RoomForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ roomForm: state.roomForm });

export default connect(mapStateToProps, { setRoomFormName, setRoomFormState })(RoomForm);