/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateSignupForm, signup } from '../../actions';
import zxcvbn from 'zxcvbn';

const assign = Object.assign || require('object.assign');

export class SignupForm extends Component {
  render() {
    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Sign up to apply to HackMerced</h3>
        <TextInputBlock
          error={this.props.errors.name}
          value={this.props.data.name}
          name='name'
          label='Name'
          placeholder='Your Name' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
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
          helper='Passwords must be at least 6 characters long'
          placeholder='Enter a password'/>
        <TextInputBlock
          error={this.props.errors.confirmPassword}
          value={this.props.data.confirmPassword}
          name='confirmPassword'
          type='password'
          label='Confirm'
          placeholder='Re-enter your password'/>

        <button style={{ marginTop: '30px' }} className='object--center button--gold'>Start your application</button>
      </form>
    );
  }

  _setPasswordStrength(level){
    const strengthMap = [
      '😢',
      '😕',
      '🙂',
      '😄',
      '😎',
    ]

    return strengthMap[level];
  }

  _onChange(event){
    if(event.target.name === 'password'){
      const score = zxcvbn(event.target.value).score;

      newState = this._mergeWithCurrentState({
        passwordStrength: this._setPasswordStrength(score)
      });

      this._emitChange(newState);
    }

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
    this.props.dispatch(updateSignupForm(newState));
  }

  _onSubmit(event){
    event.preventDefault();

    this.props.dispatch(signup({
      name: this.props.data.name,
      email: this.props.data.email,
      password: this.props.data.password,
      confirmPassword: this.props.data.confirmPassword }))


  }
}
