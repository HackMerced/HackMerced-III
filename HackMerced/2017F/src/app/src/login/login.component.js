import React, { Component } from 'react'
import { Link } from 'react-router'
import { Header, PatternScaffold, LogoWithCopy } from '../partials'
import { TextInputBlock } from '../forms/partials';
import './login.scss'

export class Login extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className=''>
        <Header/>
        <div className='login w420 object--center text--center'>
          <LogoWithCopy/>
          <form>
            <h3>Log back into your HackMerced Application</h3>
            <TextInputBlock object='login-email' type='email' label='Email' placeholder='Your Email'/>
            <TextInputBlock object='login-password' type='password' label='Password' placeholder='Enter a password'/>
            <button className='object--center button--gold'>Continue your Application</button>
            <div className='login__links'>
              <div><Link href='/forgot-password'>Forgot your password?</Link></div>
              <div><Link href='/signup'>New? Start a new application</Link></div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
