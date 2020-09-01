import { combineReducers } from 'redux';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import app from './app/reducer';

const reducers = combineReducers({
  app,
  menu,
  authUser,
});

export default reducers;
