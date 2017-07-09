import zxcvbn from 'zxcvbn';

export const setSignupEmail = email => {
  return {
    type: 'SET_SIGNUP_EMAIL',
    signUpEmail: email
  }
}

export const setSignupPassword = password => {
  return {
    type: 'SET_SIGNUP_PASSWORD',
    signUpPassword: password
  }
}


export const setSignupConfirmPassword = confirmPassword => {
  return {
    type: 'SET_SIGNUP_CONFIRM_PASSWORD',
    signUpConirmPassword: confirmPassword
  }
}

export const setSignupPasswordStrength = password => {
  return {
    type: 'SET_SIGNUP_PASSWORD_STRENGTH',
    signUpPasswordStrength: zxcvbn(pasword)
  }
}

export const setSignupName = name => {
  return {
    type: 'SET_SIGNUP_NAME',
    signUpName: name
  }
}
