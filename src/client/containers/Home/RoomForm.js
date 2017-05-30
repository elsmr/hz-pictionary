import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextInput } from 'grommet';
import slug from 'slug';
import { setRoomFormName, setRoomFormState, clearRoomForm } from '../../redux/actions';
import { FORM_STATES } from '../../constants';
import FormStateIcon from '../../components/FormStateIcon';
import { required } from '../../lib/validators';

class RoomForm extends React.Component {
  componentWillUnmount() {
    this.props.clearRoomForm();
  }

  handleChange(name) {
    const { setRoomFormName, setRoomFormState, roomForm: { formState } } = this.props;
    if (formState !== FORM_STATES.PRISTINE) {
      setRoomFormState(FORM_STATES.PRISTINE);
    }
    if (required(name)) {
      setRoomFormName(slug(name));
    }
  }

  handleSubmit() {
    const { onSubmit, roomForm: { name, formState } } = this.props;
    if (required(name) && formState === FORM_STATES.VALID) {
      onSubmit(name);
    }
  }

  render() {
    const { roomForm: { name, formState } } = this.props;
    return (
      <div className="room-form">
        <form className="form" action="">
          <TextInput
            className="form__input"
            onDOMChange={e => this.handleChange(e.target.value.toLowerCase())}
            disabled={formState === FORM_STATES.LOCKED}
          />
          <span className="form__state">
            <FormStateIcon state={formState} />
          </span>
          <Button
            className="form__button"
            label="Create room"
            onClick={(e) => {
              e.preventDefault();
              this.handleSubmit();
            }}
            disabled={formState === FORM_STATES.LOCKED || !required(name)}
            primary
            type="submit"
          />
        </form>
        {formState === FORM_STATES.INVALID &&
          <Link
            to={`/rooms/${name}`}
            className="brand-link"
          >
            go to room &quot;{name}&quot;
      </Link>
        }
      </div>
    );
  }
}

RoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ roomForm: state.roomForm });

export default connect(mapStateToProps, {
  setRoomFormName,
  setRoomFormState,
  clearRoomForm,
})(RoomForm);
