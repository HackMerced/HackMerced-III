import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { logout } from '../../../actions/AppActions';
import './header.scss'

export class Header extends Component{
  render(){
    return (
      <header className='pagefit--center text--center'>
        <IndexLink to='/' activeClassName='header__link--active'>HackMerced</IndexLink>
        <Link to='/sponsor' activeClassName='header__link--active'>Sponsorships</Link>
        <Link to='/team' activeClassName='header__link--active'>Team</Link>
        <Link to='/volunteer' activeClassName='header__link--active'>Volunteer</Link>
        <Link to='/contact' activeClassName='header__link--active'>Contact</Link>
        { this.props.loggedIn ? (
            <span>
              <span style={{margin: "0px 15px"}}>|</span>
                <Link to='/apply' activeClassName='header__link--active'>{localStorage.userName}</Link>
                <a href="#" onClick={this._logout.bind(this)}>Logout</a>
            </span>
          ) : (
            <span>
              <span style={{margin: "0px 15px"}}>|</span>
              <Link to='/signup' activeClassName='header__link--active'>Apply</Link>
              <Link to='/login' activeClassName='header__link--active'>Check Application Status</Link>
            </span>
          )
        }
      </header>
    )
  }

  _logout() {
    this.props.dispatch(logout());
  }
}
