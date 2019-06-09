import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  displayName: '',
  email: '',
  userId: ''
};

export default handleActions(
  {
    [actionTypes.LOGIN]: state => ({
      ...state,
      isLoggingIn: true
    }),
    [actionTypes.LOGIN_FAILED]: state => ({
      ...state,
      isLoggedIn: false,
      isLoggingIn: false
    }),
    [actionTypes.LOGIN_SUCCEEDED]: (state, action) => ({
      ...state,
      isLoggedIn: true,
      isLoggingIn: false,
      isInitialized: true,
      displayName: action.payload.displayName,
      email: action.payload.email,
      userId: action.payload.userId
    }),
    [actionTypes.LOGOUT]: state => ({
      ...state,
      isLoggingOut: true
    }),
    [actionTypes.LOGOUT_FAILED]: state => ({
      ...state,
      isLoggingOut: false,
      isLoggedOut: false
    }),
    [actionTypes.LOGOUT_SUCCEEDED]: state => ({
      ...state,
      isLoggingOut: false,
      isLoggedIn: false,
      isInitialized: true,
      displayName: '',
      email: '',
      userId: ''
    })
  },
  initialState
);
