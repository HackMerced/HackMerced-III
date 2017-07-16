import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { notMercedOptions } from '../../constants';

import { setCurrentApplyStep } from '../../actions';


export class StepTwo extends Component {
  render() {
    const { general_location, city_of_residence, pay_20_for_bus } = this.props.data;


    return (
      <div id='applyForm-2'>
        <TextInputBlock
          value={general_location}
          label='Where do you live?'
          labelType='large'
          name='general_location'
          type='options'
          onChange={this.props.onChange}
          options={[
            'I live in Merced County',
            ...notMercedOptions,
          ]}/>
        { notMercedOptions.includes(general_location) ?
          (<div>
            <TextInputBlock
              value={city_of_residence}
              name='city_of_residence'
              type='text'
              label='What city would you start from if you were coming to HackMerced?'
              labelType='large'
              placeholder='Type your city'
              autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            <TextInputBlock
              value={pay_20_for_bus}
              label='Would you pay $10-$20 for a round-trip bus to Merced?'
              labelType='large'
              name='pay_20_for_bus'
              type='options'
              onChange={this.props.onChange}
              options={[
                'Yes',
                'No',
              ]}/>
          </div>)
            :
          ''
        }
        <button onClick={this._goToNextStep.bind(this)}>Continue</button>
      </div>

    );

  }

  _goToNextStep(e){
    e.preventDefault()
    this.props.dispatch(setCurrentApplyStep(3));

  }
}
