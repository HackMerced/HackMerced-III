/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateLoginForm, login } from '../../actions';

const assign = Object.assign || require('object.assign');

export class LoginForm extends Component {
  render() {
    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Log back into your Application</h3>
        <TextInputBlock
          error={this.props.errors.email}
          value={this.props.data.email}
          name='email'
          type='email'
          label='Email'
          placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          error={this.props.errors.password}
          value={this.props.data.password}
          name='password'
          type='password'
          label='Password'
          emoji={this.props.data.passwordStrength}
          placeholder='Enter a password'/>

        <button style={{ marginTop: '30px' }} className='object--center button--gold'>Return to your Application</button>
      </form>
    );
  }

  _onChange(event){
    let newState = this._mergeWithCurrentState({
      [event.target.name]: event.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(updateLoginForm(newState));
  }

  _onSubmit(event){
    event.preventDefault();

    this.props.dispatch(login({
      email: this.props.data.email,
      password: this.props.data.password,
    }))


  }
}
