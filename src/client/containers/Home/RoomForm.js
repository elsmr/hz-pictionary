import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextInput } from 'grommet';
import { setRoomFormName, setRoomFormState } from '../../redux/actions';
import { FORM_STATES } from '../../constants';
import FormStateIcon from '../../components/FormStateIcon';

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
  <div className="form">
    <TextInput
      className="form__input"
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
    <span className="form__state">
      <FormStateIcon state={formState} />
    </span>
    <Button
      className="form__button"
      label="Create room"
      onClick={() => handleSubmit(onSubmit, name, formState)}
      disabled={formState === FORM_STATES.LOCKED || !isValid(name)}
      primary
    />
  </div>
);

RoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ roomForm: state.roomForm });

export default connect(mapStateToProps, { setRoomFormName, setRoomFormState })(RoomForm);
