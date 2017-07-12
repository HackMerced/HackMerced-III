import React, { Component } from 'react';
import { TextInputBlock } from '../partials';

export class StepTwo extends Component {
  render() {
    return (
      <TextInputBlock
        name='email'
        type='email'
        label='Emaila'
        placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
    );
  }
}
