import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { setCurrentApplyStep } from '../../actions';
import { getErrorCount } from '../../util';

const assign = Object.assign || require('object.assign');

export class ApplyStep extends Component{
  _getStepCompletionStatus(steps, errCount){

    let stepsCompleted = 0,
        stepCount = 0;

    for(let i in steps){
      if( steps[i] !== null){
        if((steps[i] || steps[i] === false)){
          stepsCompleted++;
        }

        stepCount++;
      }

    }

    const percentageDone = Math.floor(((stepsCompleted - errCount)/stepCount) * 100);
    return (percentageDone < 0) ? 0 : percentageDone;
  }


  render(){
    const { steps, name, description, currentStep, step, errors } = this.props;
    const errCount = (getErrorCount(errors));
    const ifErr = (errCount) ? ' apply__step__value--error' : '';

    const stepStatus = this._getStepCompletionStatus(steps, errCount);

    return (
      <div onClick={this._setApplyStep.bind(this)}
           className={(currentStep === step) ? 'apply__step__container apply__step__container--active' : 'apply__step__container'}>
        <div className={'apply__step__value apply__step__value--' + stepStatus + ifErr}  >{stepStatus}%</div>
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
