import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { setCurrentApplyStep } from '../../actions';

const assign = Object.assign || require('object.assign');

export class ApplyStep extends Component{
  _getStepCompletionStatus(steps){

    let stepsCompleted = 0,
        stepCount = 0;

    for(let i in steps){
      if(steps[i] || steps[i] === false){
        stepsCompleted++;
      }

      stepCount++;
    }

    return Math.floor((stepsCompleted/stepCount) * 100);
  }

  render(){
    const { steps, name, description, currentStep, step } = this.props;

    const stepStatus = this._getStepCompletionStatus(steps);

    return (
      <div onClick={this._setApplyStep.bind(this)}
           className={(currentStep === step) ? 'apply__step__container apply__step__container--active' : 'apply__step__container'}>
        <div className={'apply__step__value apply__step__value--' + stepStatus} >{stepStatus}%</div>
        <div className='apply__step__content'>
          <div className='apply__step__name'>{name}</div>
          <div className='apply__step__description'>{description}</div>
        </div>
      </div>
    )
  }

  _setApplyStep(){
    this.props.dispatch(setCurrentApplyStep(this.props.step))
  }
}
