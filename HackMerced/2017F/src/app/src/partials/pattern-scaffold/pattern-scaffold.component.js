import React from 'react'
import { IndexLink, Link } from 'react-router'
import './pattern-scaffold.scss'



export const PatternScaffold = (props) => {
  return (
    <div className={'pattern-scaffold ' + props.className} ></div>
  )
}

export default PatternScaffold
