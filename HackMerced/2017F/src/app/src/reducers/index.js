/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { UPDATE_SIGNUP_FORM, UPDATE_LOGIN_FORM, UPDATE_USER_DATA, UPDATE_SIGNUP_ERRORS, UPDATE_LOGIN_ERRORS, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_AUTH_AS_FALSE, SET_USER_NAME_AS_FALSE, SET_USER_NAME, SET_USER_ID_AS_FALSE, SET_USER_ID, UPDATE_APPLY_STEP_ONE, UPDATE_APPLY_STEP_TWO, UPDATE_APPLY_STEP_THREE, UPDATE_APPLY_STEP_FOUR, SET_CURRENT_APPLY_STEP, UPDATE_USER_UPDATING_STATUS } from '../constants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import { auth } from '../util';

// The initial application state
const initialState = {
  signupForm: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  signupErrors:{},
  loginForm: {
    email: '',
    password: '',
  },
  loginErrors:{},
  user:{},
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  userName: auth.userName(),
  userId: auth.userId(),
  errorMessage: '',
  applyStepOne:{
    age:'',
    status: '',
    shirt_size: ''
  },
  applyStepTwo:{
    general_location:'',
  },
  applyStepThree:{
    resume:'',
    question:'',
    experience:'',
    dietary:'',
    allergies:''
  },
  applyStepFour:{
    mlh: '',
  },
  applyStep: 1,
  userIsUpdating: false,
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: auth.loggedIn()
      });
      break;
    case SET_USER_NAME:
      return assign({}, state, {
        userName: auth.userName()
      });
      break;
    case SET_USER_ID:
      return assign({}, state, {
        userId: auth.userId(),
      });
      break;
    case SET_USER_ID_AS_FALSE:
      return assign({}, state, {
        userId: false
      });
        break;
    case UPDATE_APPLY_STEP_ONE:
      return assign({}, state, {
        applyStepOne: action.newState
      });
      break;
    case UPDATE_APPLY_STEP_TWO:
      return assign({}, state, {
        applyStepTwo: action.newState
      });
      break;
    case UPDATE_USER_UPDATING_STATUS:
      return assign({}, state, {
        userIsUpdating: action.newState
      });
      break;
    case SET_CURRENT_APPLY_STEP:
      return assign({}, state, {
        applyStep: action.newState
      });
      break;
    case UPDATE_APPLY_STEP_THREE:
      return assign({}, state, {
        applyStepThree: action.newState
      });
      break;
    case UPDATE_APPLY_STEP_FOUR:
      return assign({}, state, {
        applyStepFour: action.newState
      });
      break;
    case UPDATE_SIGNUP_FORM:
      return assign({}, state, {
        signupForm: action.newState
      });
      break;
    case UPDATE_SIGNUP_ERRORS:
      return assign({}, state, {
        signupErrors: action.newState
      });
      break;
    case UPDATE_LOGIN_FORM:
      return assign({}, state, {
        loginFom: action.newState
      });
      break;
    case UPDATE_LOGIN_ERRORS:
      return assign({}, state, {
        loginErrors: action.newState
      });
      break;
    case SET_AUTH_AS_FALSE:
      return assign({}, state, {
        loggedIn: false
      });
      break;
    case SET_USER_NAME_AS_FALSE:
      return assign({}, state, {
        userName: false
      });
      break;
    case UPDATE_USER_DATA:
      return assign({}, state, {
        user: action.newState
      });
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
      break;
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
      break;
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        errorMessage: action.message
      });

    default:
      return state;
  }
}
