import React, { Component } from 'react';
import { TextInputBlock } from '../partials';

export class StepOne extends Component {
  render() {
    return (
      <TextInputBlock
        name='email'
        type='email'
        label='EmailOne'
        placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
    );
  }
}
