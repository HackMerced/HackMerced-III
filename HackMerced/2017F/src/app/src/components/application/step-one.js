import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import myriagon from '../../dist/js/myriagon/myriagon';
import { setCurrentApplyStep } from '../../actions';

export class StepOne extends Component {
  componentDidUpdate(){
    const $myrContainer = document.getElementById('myr0');
    if(document.getElementById('university') && !$myrContainer){
      const autocomplete = new myriagon('./universities.csv', 'university', {
        onChange: (element, value) => {
          this.props.onChange({
            target: {
              name: 'university',
              value: value
            }
          })
        }
      });
    }
    if($myrContainer && !document.getElementById('university')){
      $myrContainer.parentNode.removeChild($myrContainer)
    }
  }

  render() {
    const { age, status, university, expected_graduation, high_school, shirt_size } = this.props.data;

    return (
      <div id='applyForm-1'>
        <TextInputBlock
          value={age}
          name='age'
          type='number'
          label='Age'
          placeholder='18'
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          value={status}
          label='I am a...'
          name='status'
          type='options'
          onChange={this.props.onChange}
          options={[
            'Undergraduate University Student',
            'Graduate University Student',
            'High School Student',
            'Other - Age 14 to 25'
          ]}/>
        {['Undergraduate University Student','Graduate University Student'].includes(status) ?
          (<div>
            <TextInputBlock
              value={university}
              name='university'
              type='text'
              label='University'
              placeholder="Start typing a your university's name..."
              autoCorrect="off" autoCapitalize="off" spellCheck="false" autoComplete="off"/>
            <TextInputBlock
              value={expected_graduation}
              label='What is your expected graduation year?'
              labelType='large'
              name='expected_graduation'
              type='options'
              optionsType='small'
              onChange={this.props.onChange}
              options={[
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
                '2022',
                '2023',
              ]}/>
          </div>)
        :
          ''
        }
        {['High School Student'].includes(status) ?
          (<TextInputBlock
            value={high_school}
            name='high_school'
            type='text'
            label='High School'
            placeholder='Type your High School'
            autoCorrect="off" autoCapitalize="off" spellCheck="false"/>)
        :
          ''
        }
        <TextInputBlock
          value={shirt_size}
          label='Shirt Size'
          name='shirt_size'
          type='options'
          optionsType='small'
          onChange={this.props.onChange}
          options={[
            'XS',
            'S',
            'M',
            'L',
            'XL',
            '2XL',
            '3XL',
            '4XL'
          ]}/>

          <button onClick={this._goToNextStep.bind(this)}>Continue</button>
      </div>

    );
  }

  _goToNextStep(e){
    e.preventDefault()
    this.props.dispatch(setCurrentApplyStep(2));
  }
}
