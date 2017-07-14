import React, { Component } from 'react';
import { TextInputBlock } from '../partials';

export class StepFour extends Component {
  render() {
    const { mlh, release } = this.props.data;

    return (
      <div id='applyForm-4'>
        <a style={{display:'block', marginBottom:'20px'}} target='_blank' href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code of Conduct</a>
        <TextInputBlock
          value={mlh}
          label='Do you agree to code of conduct above?'
          labelType='large'
          name='mlh'
          type='options'
          onChange={this.props.onChange}
          options={[
            'Yes',
            'No',
          ]}/>

      </div>
    );
  }
}
