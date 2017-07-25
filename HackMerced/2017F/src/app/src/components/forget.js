import React, { Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { ForgetForm } from './forms';
import { LogoWithCopy } from './partials'


export class ForgetComponent extends Component {

  render() {
    const dispatch = this.props.dispatch;
    const { forgotPasswordForm, loginErrors } = this.props.data;

    return (
      <div className='authorization-object signup w420 text--center object--center'>
        <LogoWithCopy/>
        <ForgetForm data={forgotPasswordForm} errors={loginErrors} dispatch={dispatch}/>
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
export const Forget = connect(select)(ForgetComponent);
