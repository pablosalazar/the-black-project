import { SET_ERROR_MESSAGE_APP, SET_SUCCESS_MESSAGE_APP } from '../actions';

export const setSuccessMessageApp = (message) => ({
  type: SET_SUCCESS_MESSAGE_APP,
  payload: { message },
});

export const setErrorMessageApp = (message) => ({
  type: SET_ERROR_MESSAGE_APP,
  payload: { message },
});
