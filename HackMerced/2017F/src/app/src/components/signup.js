import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SignupForm } from './forms';
import { LogoWithCopy } from './partials'


export class SignupComponent extends Component {

  render() {
    const dispatch = this.props.dispatch;
		const { signupForm, signupErrors } = this.props.data;

    return (
      <div className='authorization-object signup w420 text--center object--center'>
        <LogoWithCopy/>
        <SignupForm data={signupForm} errors={signupErrors} dispatch={dispatch}/>
      </div>
    )
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export const Signup = connect(select)(SignupComponent);
