import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateApplyStep } from '../../actions/AppActions';
import { StepOne, StepTwo, StepThree, StepFour } from './';

const assign = Object.assign || require('object.assign');

export class ApplicationLayout extends Component {


  render() {
    return (
      <form onChange={this._onChange.bind(this)}>
        {this._renderStep(this.props.data)}
      </form>
    );
  }

  _mapApplyData(props){
    const { applyStep, applyStepOne, applyStepTwo, applyStepThree, applyStepFour } = props;

    const applyDataMap = [
      applyStepOne,
      applyStepTwo,
      applyStepThree,
      applyStepFour
    ]

    return applyDataMap[applyStep - 1] || applyMap[0];
  }

  _renderStep(props){
    const { applyStep, applyStepOne, applyStepTwo, applyStepThree, applyStepFour } = props;

    const applyMap = [
      (<StepOne data={applyStepOne} />),
      (<StepTwo data={applyStepTwo} />),
      (<StepThree data={applyStepThree} />),
      (<StepFour data={applyStepFour} />)
    ]

    return applyMap[applyStep - 1] || applyMap[0];

  }

  _onChange(event){
    const { props } = this;

    let newState = this._mergeWithCurrentState(props, {
      [event.target.name]: event.target.value
    });

    this._emitChange(props, newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(props, change) {
    return assign(this._mapApplyData(props), change);
  }

  // Emits a change of the form state to the application state
  _emitChange(props, newState) {
    const { applyStep } = props;

    this.props.dispatch(updateApplyStep(applyStep, newState));
  }
}
