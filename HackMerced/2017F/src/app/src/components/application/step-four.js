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
            <li>Gender</li>
            <li>Gender identity and expression</li>
            <li>Age</li>
            <li>Sexual orientation</li>
            <li>Disability</li>
            <li>Physical appearance</li>
            <li>Body size</li>
            <li>Race</li>
            <li>Ethnicity</li>
            <li>Nationality</li>
            <li>Religion</li>
            <li>Previous hackathon attendance or lack of</li>
            <li>Computing experience or lack of</li>
            <li>Chosen programming language or tech stack</li>
          </ul>
          <p>We do not tolerate harassment of hackathon participants in any form. Sexual language and imagery is not appropriate at any hackathon venue, this includes the following.</p>
          <ul>
            <li>Hacks</li>
            <li>Talks, presentations, or demos</li>
            <li>Workshops</li>
            <li>Any parties associated to the hackathon</li>
            <li>Social media</li>
            <li>Any other online media</li>
          </ul>
          <p>You agree to <a className='link--underlined' target='_blank' href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code of Conduct</a></p>
          <p>You also agree to the terms of both the <a className='link--underlined' target='_blank' href='https://mlh.io/privacy'>MLH Privacy Policy</a> and the <a className='link--underlined' target='_blank' href='https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions'>MLH Contest Terms and Conditions</a>. Please note that you may receive pre and post-event informational e-mails and occasional messages about hackathons from MLH as per the MLH Privacy Policy.</p>
          <p>Hackathon participants violating these rules may be sanctioned or expelled from the hackathon at the discretion of the hackathon organisers.</p>
        </div>

        <TextInputBlock
          value={mlh}
          error={this.props.errors.mlh}
          label="Do you agree to the statements above?"
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
