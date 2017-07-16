import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateApplyStep, update } from '../../actions';
import { StepOne, StepTwo, StepThree, StepFour } from './';
import { notMercedOptions } from '../../constants';

const assign = Object.assign || require('object.assign');
let timeChecker;

export class ApplicationLayout extends Component {


  render() {
    return (
      <div className='application'>
        <h2 className='application__title'>
          {this._mapContent(this.props.data, 'title')}
        </h2>
        <p className='application__description'>
          {this._mapContent(this.props.data, 'description')}
        </p>
        <form id='applyForm' onChange={this._onChange.bind(this)}>
          {this._mapContent(this.props.data, 'ui')}
        </form>
      </div>

    );
  }

  _mapContent(data, req){
    const { applyStep, applyStepOne, applyStepTwo, applyStepThree, applyStepFour } = data;

    const applyDataMap = [
      {
        title: 'About You',
        description: "Thanks for applying to HackMerced, to ensure we can the best exprience for you, we'd like to know some cursory information.",
        data: applyStepOne,
        ui: (<StepOne
              data={applyStepOne}
              dispatch={this.props.dispatch}
              onChange={this._onChange.bind(this)} />),
      },
      {
        title: 'Travel Information',
        description: "We need to figure out if you are elgible to reimbursements",
        data: applyStepTwo,
        ui: (<StepTwo
                data={applyStepTwo}
                onChange={this._onChange.bind(this)}
                dispatch={this.props.dispatch}
              />),
      },
      {
        title: 'More Information',
        description: "Now here's the best part, we want to know about you personally!",
        data: applyStepThree,
        ui: (<StepThree
                data={applyStepThree}
                onChange={this._onChange.bind(this)}
                dispatch={this.props.dispatch}
              />),
      },
      {
        title: 'Legal Information',
        description: "The following information will help us approve you for this event",
        data: applyStepFour,
        ui: (<StepFour
                data={applyStepFour}
                onChange={this._onChange.bind(this)}
                />),
      },
    ]

    return applyDataMap[applyStep - 1][req] || applyDataMap[0].ui;
  }

  _onChange(event){
    const { data } = this.props;
    const { name, value } = event.target;
    let newState = {};

    if( name === 'general_location' ){
      const isNotMerced = notMercedOptions.includes(value);
      newState = this._mergeWithCurrentState(data, {
        [ name ]: value,
        city_of_residence: isNotMerced  ? '' : null,
        pay_20_for_bus: isNotMerced ? '' : null,
      });

      this._emitChange(data, newState);
      return;
    }

    if( name === 'status' ){
      const isCollege = ['Undergraduate University Student','Graduate University Student'].includes(value)
      const isHighSchool = ['High School Student'].includes(value)

      newState = this._mergeWithCurrentState(data, {
        [ name ]: value,
        university: isCollege  ? '' : null,
        expected_graduation: isCollege  ? '' : null,
        high_school: isHighSchool ? '' : null,
      });

      this._emitChange(data, newState);
      return;
    }

    newState = this._mergeWithCurrentState(data, {
      [ name ]: value
    });

    this._emitChange(data, newState);
    return;
  }

  // Merges the current state with a change
  _mergeWithCurrentState(data, change) {
    return assign(this._mapContent(data, 'data'), change);
  }


  // Emits a change of the form state to the application state
  _emitChange(data, newState) {
    const { applyStep, userIsUpdating } = data;

    if(!userIsUpdating){
      clearTimeout(timeChecker);

      timeChecker = setTimeout(() => {
        this.props.dispatch(update(newState));

      }, 1000)
    }

    this.props.dispatch(updateApplyStep(applyStep, newState));
  }
}
