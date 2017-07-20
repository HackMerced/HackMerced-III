import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { ApplyStep } from './partials'
import { ApplicationLayout } from './application'
import { update, submit, updateSubmittedView } from '../actions'
import { getErrorCount } from '../util';

import '../styles/apply.scss'

export class ApplyComponenet extends Component {
  _determineStatusInfo(status){
    const statusMap = {
      registered: 'Continue your application below',
      applied: 'Thanks for applying!'
    }

    return statusMap[status] || 'Continue your application below'
  }

  _submitApplication(e){
    e.preventDefault();

    const { applyStepOne, applyStepTwo, applyStepThree, applyStepFour } = this.props.data;

    const data = {
      ...applyStepOne,
      ...applyStepTwo,
      ...applyStepThree,
      ...applyStepFour,
    }

    this.props.dispatch(submit(data));
  }

  render() {
    const dispatch = this.props.dispatch;
    const { user, submittedView, applyStep, applyStepOne, applyStepTwo, applyStepThree, applyStepFour, applyErrors } = this.props.data;

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
          <div className='apply__status__steps__container'>
            <h4>Your Application</h4>
            <div className='apply__status__steps'>
            <div className={'apply__step__container__bar apply__step__container__bar--' + applyStep }></div>
              <ApplyStep
                dispatch={dispatch}
                steps={applyStepOne}
                step={1}
                currentStep={applyStep}
                name='About You'
                errors={
                  [
                    applyErrors.age,
                    applyErrors.status,
                    applyErrors.university,
                    applyErrors.expected_graduation,
                    applyErrors.high_school,
                    applyErrors.shirt_size
                  ]
                }
                description='Basic Demographic Information'/>
              <ApplyStep
                dispatch={dispatch}
                steps={applyStepTwo}
                step={2}
                currentStep={applyStep}
                name='Travel'
                errors={
                  [  applyErrors.general_location,  applyErrors.city_of_residence,  applyErrors.pay_20_for_bus ]
                }
                description='Reimbursements and Transport'/>
              <ApplyStep
                dispatch={dispatch}
                steps={applyStepThree}
                step={3}
                currentStep={applyStep}
                name='More You'
                errors={
                  [ applyErrors.resume,  applyErrors.experience,  applyErrors.linkedin,  applyErrors.github,  applyErrors.devpost,  applyErrors.dietary_restrictions, applyErrors.allergies ]
                }
                description='Resumes, questions, and more'/>
              <ApplyStep
                dispatch={dispatch}
                steps={applyStepFour}
                errors={
                  [ applyErrors.mlh ]
                }
                step={4}
                currentStep={applyStep}
                name='Legal'
                description='Some ground rules.'/>
            </div>
          </div>
          {getErrorCount(applyErrors) ?
            <div>
              <button className='apply__submit-button apply__submit-button--error' onClick={this._submitApplication.bind(this)}>Submit Application</button>
              <div className='apply__submit-notification'>There seems to be some errors in your application</div>
            </div>
            :
            <div>

              { user.status !== 'registered' ?
                <div>
                  <button className='apply__submit-button apply__submit-button--submitted' onClick={this._submitApplication.bind(this)}>Re-submit Application</button>
                  <div className='apply__submit-notification'>You have succesfully submitted your application!</div>
                </div>

                :
                <button className='apply__submit-button' onClick={this._submitApplication.bind(this)}>Submit Application</button>
              }
            </div>
          }


        </sidebar>
        <content>
          <ApplicationLayout dispatch={dispatch} submitApplication={this._submitApplication} data={this.props.data} />
        </content>
        {
          submittedView ? (
            <div>
              <div className='submitted-application__container'></div>
              <div className='submitted-application'>
                <div className='submitted-application__gif'></div>
                <div className='submitted-application__content'>
                  <h1>Yippie!</h1>
                  <p>You have succesfully submitted your application, what would you like to do now? Remember that you can always edit your application!</p>
                </div>
                <div className='submitted-application__buttons'>
                  <button onClick={this._returnToApplication.bind(this)}>Return to Application</button>
                  <button className='button--gold'  onClick={this._goToVideo.bind(this)}>Watch some memes!</button>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }

  _returnToApplication() {
    this.props.dispatch(updateSubmittedView(false));
  }

  _goToVideo() {
    window.open('https://www.youtube.com/watch?v=j20cTvQYe6s&list=PLgZby1RUaIzlN2HD9a-gnlCNZKWEsn4hl', '_target')
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
