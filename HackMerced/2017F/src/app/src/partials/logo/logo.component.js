import React from 'react'
import { IndexLink, Link } from 'react-router'
import './logo.scss'

export const Logo = (props) => {
  return (
    <div className={'logo ' + (props.className || '')} ></div>
  )
}

export default Logo
