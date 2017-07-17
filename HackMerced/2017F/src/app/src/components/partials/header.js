import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { logout, updateMobileMenuStatus } from '../../actions';
import { Logo } from './'
import '../../styles/header.scss'

export class Header extends Component{

  _generalLinks(that){
    return (
      <nav className='header__nav--center text--center'>
        <Link onClick={that._onClickHide.bind(that)} to='/sponsor' activeClassName='header__link--active'>Sponsorships</Link>
        <Link onClick={that._onClickHide.bind(that)} to='/team' activeClassName='header__link--active'>Team</Link>
        <Link onClick={that._onClickHide.bind(that)} to='/volunteer' activeClassName='header__link--active'>Volunteer</Link>
        <Link  onClick={that._onClickHide.bind(that)} to='/contact' activeClassName='header__link--active'>Contact</Link>
      </nav>
    )
  }

  _authLinks(that){
    const { loggedIn } = that.props.data;

    return (
      <nav className='header__nav--right text--right'>
        { loggedIn ? (
            <span>
                <Link onClick={that._onClickHide.bind(that)} to='/apply' activeClassName='header__link--active'>{localStorage.userName}</Link>
                <a onClick={that._onClickHide.bind(that)} href="#" onClick={that._logout.bind(that)}>Logout</a>
            </span>
          ) : (
            <span>
              <Link onClick={that._onClickHide.bind(that)} to='/signup' activeClassName='header__link--active'>Apply</Link>
              <Link onClick={that._onClickHide.bind(that)} to='/login' activeClassName='header__link--active'>Check Application Status</Link>
            </span>
          )
        }
      </nav>
    )
  }

  _onClick(){
    const { mobileMenuStatus } = this.props.data;
    this.props.dispatch(updateMobileMenuStatus(!mobileMenuStatus))
  }

  _onClickHide(){
    this.props.dispatch(updateMobileMenuStatus(false))
  }

  render(){

    const { pathname } = this.props.location;
    const { mobileMenuStatus } = this.props.data;
    const location = ((pathname !== '/') ?  pathname : 'home');

    return (
      <header className={'header--at-path-' + location.replace(/\//g, '')}>
        <div className='header__logo-with-copy'>
          <Logo />
          <IndexLink className='disable-hover' to='/' activeClassName='header__link--active'>HackMerced</IndexLink>
        </div>
        {this._generalLinks(this)}
        {this._authLinks(this)}

        <div onClick={this._onClick.bind(this)} className='header__hamburger-menu'></div>
        {
          mobileMenuStatus ? (
            <div className='header__mobile-menu'>
              {this._generalLinks(this)}
              {this._authLinks(this)}
            </div>
          )
            : ''
        }
      </header>
    )
  }

  _logout() {
    this.props.dispatch(logout());
  }
}
