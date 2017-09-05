import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { logout, updateMobileMenuStatus } from '../../actions';
import { Logo } from './'
import { MLHTrustBadge } from '../vendor';
import '../../styles/header.scss'

export class Header extends Component{

  _generalLinks(that){
    return (
      <nav className='header__nav--center text--center'>
        <a onClick={that._onClickHide.bind(that)} href='https://github.com/hackmerced' activeClassName='header__link--active'>Open Source</a>
        <a onClick={that._onClickHide.bind(that)} href='https://facebook.com/hackmerced' activeClassName='header__link--active'>Facebook</a>
        <a onClick={that._onClickHide.bind(that)} href='https://twitter.com/hackmerced' activeClassName='header__link--active'>Twitter</a>
      	<a onClick={that._onClickHide.bind(that)} href='https://instagram.com/hackmerced' activeClassName='header__link--active'>Instagram</a>
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
    const cullAnimation = (window.sessionStorage.reduceRefresh) ? ' header--cull-animation' : '';

    const { pathname } = this.props.location;
    const { mobileMenuStatus } = this.props.data;
    const location = ((pathname !== '/') ?  pathname : 'home');

    return (
      <header className={'header--at-path-' + location.replace(/\//g, '') + cullAnimation}>
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
      <MLHTrustBadge/>
      </header>
    )
  }

  _logout() {
    this.props.dispatch(logout());
  }
}
