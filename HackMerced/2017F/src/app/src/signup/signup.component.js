import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { Header, PatternScaffold, LogoWithCopy } from '../partials'
import { TextInputBlock } from '../forms/partials';
import { SignupService } from './signup.service'
import zxcvbn from 'zxcvbn';
import './signup.scss'

export class Signup extends Component {
  constructor(props, setSignupData){
    super(props);

    this.state = { name: '', email: '', password: '', confirmPassword: '', passwordStrength:'', errors: {} }

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
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
      this.setState({
        ['passwordStrength']: this._setPasswordStrength(score)
      })
    }

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  _onSubmit(event){
    SignupService.createUser(
      { name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword })
      .then(() => {
        console.log('done')
      }).catch((err) => {
        let errorSet = {};
        if(err.validation){
          err.validation.forEach((error) => {
            errorSet[error.key] = error.message.replace('confirmPassword', '')
          })
        }

        this.setState({
          ['errors'] : errorSet
        })
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className=''>
        <Header/>
        <div className='signup w420 text--center object--center'>
          <LogoWithCopy/>
          <form onChange={this._onChange} onSubmit={this._onSubmit} >
            <h3>Sign up to apply to HackMerced</h3>
            <TextInputBlock
              error={this.state.errors.name}
              state={this.state}
              name='name'
              label='Name'
              placeholder='Your Name'/>
            <TextInputBlock
              error={this.state.errors.email}
              state={this.state}
              name='email'
              type='email'
              label='Email'
              placeholder='Your Email'/>
            <TextInputBlock
              error={this.state.errors.password}
              state={this.state}
              name='password'
              type='password'
              label='Password'
              emoji={this.state.passwordStrength}
              helper='Passwords must be at least 6 characters long'
              placeholder='Enter a password'/>
            <TextInputBlock
              error={this.state.errors.confirmPassword}
              state={this.state}
              name='confirmPassword'
              type='password'
              label='Confirm'
              placeholder='Re-enter your password'/>

            <button style={{ marginTop: '30px' }} className='object--center button--gold'>Start your application</button>
          </form>
        </div>
      </div>
    )
  }
}
