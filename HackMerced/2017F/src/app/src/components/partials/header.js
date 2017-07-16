import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { logout } from '../../actions';
import { Logo } from './'
import '../../styles/header.scss'

export class Header extends Component{
  render(){
    const { pathname } = this.props.location;
    const location = ((pathname !== '/') ?  pathname : 'home');

    return (
      <header className={'header--at-path-' + location.replace(/\//g, '')}>
        <div className='header__logo-with-copy'>
          <Logo />
          <IndexLink className='disable-hover' to='/' activeClassName='header__link--active'>HackMerced</IndexLink>
        </div>
        <nav className='header__nav--center text--center'>
          <Link to='/sponsor' activeClassName='header__link--active'>Sponsorships</Link>
          <Link to='/team' activeClassName='header__link--active'>Team</Link>
          <Link to='/volunteer' activeClassName='header__link--active'>Volunteer</Link>
          <Link to='/contact' activeClassName='header__link--active'>Contact</Link>
        </nav>
        <nav className='header__nav--right text--right'>
          { this.props.loggedIn ? (
              <span>
                  <Link to='/apply' activeClassName='header__link--active'>{localStorage.userName}</Link>
                  <a href="#" onClick={this._logout.bind(this)}>Logout</a>
              </span>
            ) : (
              <span>
                <Link to='/signup' activeClassName='header__link--active'>Apply</Link>
                <Link to='/login' activeClassName='header__link--active'>Check Application Status</Link>
              </span>
            )
          }
        </nav>
      </header>
    )
  }

  _logout() {
    this.props.dispatch(logout());
  }
}
