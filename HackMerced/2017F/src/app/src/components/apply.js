import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { ApplyStep } from './partials'
import { ApplicationLayout } from './application'
import '../styles/apply.scss'

export class ApplyComponenet extends Component {
  _determineStatusInfo(status){
    const statusMap = {
      registered: 'Continue your application below',
      applied: 'Thanks for applying!'
    }

    return statusMap[status] || 'Continue your application below'
  }

  render() {
    const dispatch = this.props.dispatch;
    const { user, applyStep, applyStepOne, applyStepTwo, applyStepThree, applyStepFour } = this.props.data;

    return (
      <div className='apply'>
        <sidebar>
          <div className='apply__sidebar__header'>
            Welcome, { user.name }
          </div>
          <div className='apply__status'>
            <h4>Your Application Status</h4>
            <div className='apply__status__value'>
              { user.status }
            </div>
            {/* <div className='apply__status__info'>
              { this._determineStatusInfo(user.status) }
            </div> */}
          </div>
          <div className='apply__status__steps'>
            <h4>Your Application</h4>
            <ApplyStep dispatch={dispatch} steps={applyStepOne} step={1} currentStep={applyStep} name='About You' description='Basic Demographic Information'/>
            <ApplyStep dispatch={dispatch} steps={applyStepTwo} step={2} currentStep={applyStep} name='Travel' description='Reimbursements and Transport'/>
            <ApplyStep dispatch={dispatch} steps={applyStepThree} step={3} currentStep={applyStep} name='More You' description='Resumes, questions, and more'/>
            <ApplyStep dispatch={dispatch} steps={applyStepFour} step={4} currentStep={applyStep} name='Legal' description='Some ground rules.'/>
          </div>
        </sidebar>
        <content>
          <ApplicationLayout dispatch={dispatch} data={this.props.data} />
        </content>
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
export const Apply = connect(select)(ApplyComponenet);
