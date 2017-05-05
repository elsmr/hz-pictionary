import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextInput } from 'grommet';
import { setProfileFormUsername, setProfileFormState } from '../../redux/actions';
import FormStateIcon from '../../components/FormStateIcon';
import { FORM_STATES } from '../../constants';
import { required } from '../../lib/validators';


const isValid = required;

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

const ProfileForm = ({
  setProfileFormUsername,
  setProfileFormState,
  onSubmit,
  username,
  profileForm,
}) => (
  <form action="" className="form">
    <TextInput
      onDOMChange={
        e => handleChange(
          setProfileFormUsername,
          setProfileFormState,
          profileForm.formState,
          e.target.value.toLowerCase()
        )
      }
      placeHolder={username}
      disabled={profileForm.formState === FORM_STATES.LOCKED}
    />
    <span className="form__state" style={{ transform: 'translate(-20px, 4px)' }}>
      <FormStateIcon state={profileForm.formState} />
    </span>
    <Button
      className="form__button"
      label="Update username"
      onClick={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit, profileForm.username, profileForm.formState);
      }}
      disabled={profileForm.formState === FORM_STATES.LOCKED || !isValid(profileForm.username)}
      primary
      type="submit"
    />
  </form>
);

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ profileForm: state.profileForm });

export default connect(mapStateToProps, {
  setProfileFormUsername,
  setProfileFormState,
})(ProfileForm);
