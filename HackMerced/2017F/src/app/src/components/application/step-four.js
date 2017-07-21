import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { setCurrentApplyStep } from '../../actions';


export class StepFour extends Component {
  render() {
    const { mlh, release } = this.props.data.applyStepFour;

    return (
      <div id='applyForm-4'>
        <div className='apply__code-of-conduct'>
          <p>Our hackathon is dedicated to providing a harassment-free experience for everyone, regardless of the following.</p>
          <ul>
            <li>gender</li>
            <li>gender identity and expression</li>
            <li>age</li>
            <li>sexual orientation</li>
            <li>disability</li>
            <li>physical appearance</li>
            <li>body size</li>
            <li>race</li>
            <li>ethnicity</li>
            <li>nationality</li>
            <li>religion</li>
            <li>previous hackathon attendance or lack of</li>
            <li>computing experience or lack of</li>
            <li>chosen programming language or tech stack</li>
          </ul>
          <p>We do not tolerate harassment of hackathon participants in any form. Sexual language and imagery is not appropriate at any hackathon venue, this includes the following.</p>
          <ul>
            <li>hacks</li>
            <li>talks, presentations, or demos</li>
            <li>workshops</li>
            <li>any parties associated to the hackathon</li>
            <li>social media</li>
            <li>any other online media</li>
          </ul>
          <p> You also agree to <a className='link--underlined' target='_blank' href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code of Conduct</a></p>
          <p>Hackathon participants violating these rules may be sanctioned or expelled from the hackathon at the discretion of the hackathon organisers.</p>
        </div>

        <TextInputBlock
          value={mlh}
          error={this.props.errors.mlh}
          label="Do you agree to HackMerced's and MLH's code of conduct above?"
          labelType='large'
          name='mlh'
          type='options'
          onChange={this.props.onChange}
          options={[
            'Yes',
            'No',
          ]}/>

        <button className='button--go-back' onClick={this._goToPrevStep.bind(this)}>Go Back</button>
        <button className='button--submit-application-in-text' onClick={this.props.submitApplication.bind(this)}>Submit Application</button>
      </div>
    );
  }

  _goToPrevStep(e){
    e.preventDefault()
    this.props.dispatch(setCurrentApplyStep(3));
  }
}
