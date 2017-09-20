import React, { Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { VolunteerForm } from './forms';
import { LogoWithCopy } from './partials';

import '../styles/apply.scss';

export class VolunteerComponent extends Component {


  render() {
    const dispatch = this.props.dispatch;
    const { volunteerPersonForm, loginErrors } = this.props.data;

    return (
      <div className='authorization-form signup w420 text--center object--center'>
          <LogoWithCopy/>
          <VolunteerForm data={volunteerPersonForm} errors={loginErrors} dispatch={dispatch}/>
      </div>
    )
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export const Volunteer = connect(select)(VolunteerComponent);
