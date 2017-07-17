/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import { Header } from './partials';
import { connect } from 'react-redux';
import { auth } from '../util';
import { fetchUser } from '../actions'

class LayoutComponent extends Component {
  constructor(props){
    super(props);


    if(this.props.data.loggedIn){
      this.props.dispatch(fetchUser());
    }

  }

  render() {
    return(
      <div style={{height:"100%"}}>
        <Header data={this.props.data} location={this.props.location}  dispatch={this.props.dispatch} />
        { this.props.children }
      </div>
    )
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export const Layout = connect(select)(LayoutComponent);
