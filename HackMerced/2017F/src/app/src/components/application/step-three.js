import React, { Component } from 'react';
import { TextInputBlock } from '../partials';

export class StepThree extends Component {
  render() {
    return (
      <TextInputBlock
        name='email'
        type='email'
        label='Emailb'
        placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
    );
  }
}
