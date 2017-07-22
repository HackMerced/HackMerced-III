import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Logo } from './logo'

export const LogoWithCopy = (props) => {
  return (
    <div className='logo-with-copy text--center'>
      <Logo className='object--center'/>
      <h2 className='logo-with-copy__name'>HackMerced</h2>
      <h4 className='logo-with-copy__date'>September 29 to October 1</h4>
      <div className='logo-with-copy__divider'></div>
    </div>

  )
}

export default LogoWithCopy
