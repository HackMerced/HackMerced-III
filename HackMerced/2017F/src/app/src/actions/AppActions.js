/*
 * Actions update things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import { SET_AUTH, UPDATE_LOGIN_FORM, UPDATE_USER_DATA, UPDATE_SIGNUP_FORM, UPDATE_SIGNUP_ERRORS, UPDATE_LOGIN_ERRORS, SET_AUTH_AS_FALSE, SET_USER_NAME_AS_FALSE, SET_USER_NAME, SET_USER_ID_AS_FALSE, SET_USER_ID, UPDATE_APPLY_STEP_ONE, UPDATE_APPLY_STEP_TWO, UPDATE_APPLY_STEP_THREE, UPDATE_APPLY_STEP_FOUR, SET_CURRENT_APPLY_STEP } from '../constants/AppConstants';
import * as errorMessages  from '../constants/MessageConstants';
import { auth } from '../util';
import { browserHistory } from 'react-router';



export function login(user) {
  return (dispatch) => {

    auth.login(user).then((user) => {
      dispatch(setAuth());
      dispatch(setUserName());
      dispatch(setUserId());
      dispatch(updateUserData({
        name: user.name,
        email: user.email,
        status: user.status,
        details: user.details
      }));
      dispatch(updateLoginForm({
        email: "",
        password: "",
      }));
      forwardTo('/apply');
    }).catch(err => {
      let errorSet = {};
      if(err.validation){
        err.validation.forEach((error) => {
          errorSet[error.key] = error.message.replace('confirmPassword', '')
        })
      }

      dispatch(updateLoginErrors(errorSet));
    });
  }
}

export function fetchUser(){
  return (dispatch) => {
    auth.fetchUser().then((user) => {
      dispatch(setUserName());
      dispatch(updateUserData({
        name: user.name,
        email: user.email,
        status: user.status,
        details: user.details
      }));
    }).catch(err => {

    });
  }
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    auth.logout().then(() => {
      dispatch(setAuthAsFalse());
      dispatch(setUserNameAsFalse())
      dispatch(updateUserData({}));
      browserHistory.replace('/');
    });
  }
}

export function signup(user) {
   return (dispatch) => {

     auth.signup(user).then((user) => {
       dispatch(setAuth());
       dispatch(setUserName());
       dispatch(setUserId());
       dispatch(updateUserData({
         name: user.name,
         email: user.email,
         status: user.status,
         details: user.details
       }));
       dispatch(updateSignupForm({
         email: "",
         name: "",
         confirmPassword: "",
         password: "",
         passwordStrength: ""
       }));
       forwardTo('/apply');
     }).catch(err => {
       let errorSet = {};
       if(err.validation){
         err.validation.forEach((error) => {
           errorSet[error.key] = error.message.replace('confirmPassword', '')
         })
       }

       dispatch(updateSignupErrors(errorSet));
     });
   }
 }

export function updateApplyStep(index, data){
  const applyStepMap = [
    updateApplyStepOne(data),
    updateApplyStepTwo(data),
    updateApplyStepThree(data),
    updateApplyStepFour(data),
  ]

  return applyStepMap[index - 1] || applyStepMap[0]
}

export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}


export function setAuthAsFalse() {
  return { type: SET_AUTH_AS_FALSE  };
}

export function setUserNameAsFalse() {
  return { type: SET_USER_NAME_AS_FALSE  };
}

export function setAuth() {
  return { type: SET_AUTH  };
}

export function setUserIdAsFalse() {
  return { type: SET_USER_ID_AS_FALSE  };
}

export function setUserId() {
  return { type: SET_USER_ID  };
}

export function setUserName(newState) {
  return { type: SET_USER_NAME, newState };
}

export function setCurrentApplyStep(newState) {
  return { type: SET_CURRENT_APPLY_STEP, newState };
}

export function updateSignupForm(newState) {
  return { type: UPDATE_SIGNUP_FORM, newState };
}

export function updateSignupErrors(newState) {
  return { type: UPDATE_SIGNUP_ERRORS, newState };
}

export function updateLoginForm(newState) {
  return { type: UPDATE_LOGIN_FORM, newState };
}

export function updateLoginErrors(newState) {
  return { type: UPDATE_LOGIN_ERRORS, newState };
}

export function updateUserData(newState) {
  return { type: UPDATE_USER_DATA, newState };
}

export function updateApplyStepOne(newState) {
  return { type: UPDATE_APPLY_STEP_ONE, newState };
}
export function updateApplyStepTwo(newState) {
  return { type: UPDATE_APPLY_STEP_TWO, newState };
}
export function updateApplyStepThree(newState) {
  return { type: UPDATE_APPLY_STEP_THREE, newState };
}
export function updateApplyStepFour(newState) {
  return { type: UPDATE_APPLY_STEP_FOUR, newState };
}


function forwardTo(location) {
  browserHistory.push(location);
}
