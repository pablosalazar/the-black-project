import { SET_ERROR_MESSAGE_APP, SET_SUCCESS_MESSAGE_APP } from '../actions';

const INIT_STATE = {
  success_message_app: '',
  error_message_app: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SUCCESS_MESSAGE_APP:
      return { ...state, success_message_app: action.payload.message };
    case SET_ERROR_MESSAGE_APP:
      return { ...state, error_message_app: action.payload.message };
    default:
      return { ...state };
  }
};
