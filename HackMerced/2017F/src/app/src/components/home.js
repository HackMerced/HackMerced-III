import React, { Component } from 'react'
import { Link } from 'react-router'
import { Header, PatternScaffold, LogoWithCopy } from './partials'

export class Home extends Component {
  render() {
    return (
      <div style={{height: "100%"}}>
        <div style={{height: "100%"}}>
          <PatternScaffold className='pattern-scaffold--left'/>
          <PatternScaffold className='pattern-scaffold--right'/>
          <div className='home-action w400 object--center text--center'>
            <LogoWithCopy/>
            <h1 className='home-action__event-description'>36 hours of a<br></br>hacking’ good time</h1>
            <Link className='disable-hover' href='/signup'><button className='button--gold'>Apply Now</button></Link>
            <div className='home__learn-more'>Scroll to learn more</div>
          </div>
        </div>
        <div className=''>
          Helo
        </div>
      </div>
    )
  }
}
