import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { Header, PatternScaffold, LogoWithCopy } from '../partials'
import { TextInputBlock } from '../forms/partials';
import './signup.scss'

export class Signup extends Component {
  constructor(props, setSignupData){
    super(props);

    this.state = {
      signupData: { name: '', email: '', password: '', passwordConfirm: '', passwordStrength:''}
    }
  }

  _setEmail(){
    this.setState('signupData')
  }

  render() {
    return (
      <div className=''>
        <Header/>
        <div className='signup w420 text--center object--center'>
          <LogoWithCopy/>
          <form>
            <h3>Sign up to apply to HackMerced</h3>
            <TextInputBlock state={this.state} object='signup-name' label='Name' placeholder='Your Name'/>
            <TextInputBlock state={this.state} object='signup-email' type='email' label='Email' placeholder='Your Email'/>
            <TextInputBlock state={this.state} object='signup-password' type='password' label='Password' helper='Passwords must be at least 6 characters long' placeholder='Enter a password'/>
            <TextInputBlock state={this.state} object='signup-confirm-password' type='password' label='Confirm' placeholder='Re-enter your password'/>
            <button style={{ marginTop: '30px' }} className='object--center button--gold'>Start your application</button>
          </form>
        </div>
      </div>
    )
  }
}
