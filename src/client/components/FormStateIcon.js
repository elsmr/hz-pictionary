import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';
import CloseIcon from 'grommet/components/icons/base/Close';
import CheckIcon from 'grommet/components/icons/base/Checkmark';
import LockIcon from 'grommet/components/icons/base/Lock';
import { FORM_STATES } from '../constants';

const FormStateIcon = ({ state }) => {
  switch (state) {
    case FORM_STATES.INVALID:
      return <CloseIcon />;
    case FORM_STATES.VALID:
      return <CheckIcon />;
    case FORM_STATES.LOADING:
      return <Spinning />;
    case FORM_STATES.LOCKED:
      return <LockIcon />;
    default:
      return null;
  }
};

export default FormStateIcon;
