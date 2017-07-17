import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { setCurrentApplyStep } from '../../actions';


export class StepThree extends Component {


  render() {
    const { resume, question, experience, dietary_restrictions, allergies, github, linkedin, devpost } = this.props.data;

    return (
      <div id='applyForm-3'>
        <TextInputBlock
          value={resume}
          error={this.props.errors.resume}
          name='resume'
          type='fileupload'
          label={(resume) ? 'Resume uploaded - click to change.' : 'Click here to upload a resume!'}
          onChange={this.props.onChange}
          labelType='large'
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          value={experience}
          label='What is your level of experience at programming?'
          labelType='large'
          error={this.props.errors.experience}
          name='experience'
          type='options'
          onChange={this.props.onChange}
          options={[
            'Beginner',
            'Intermediate',
            'Advanced',
          ]}/>
        <TextInputBlock
          value={linkedin}
          label='Linkedin URL'
          name='linkedin'
          type='text'
          placeholder='https://linkedin.com/in/'
          error={this.props.errors.linkedin}
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          value={github}
          label='GitHub URL'
          name='github'
          type='text'
          error={this.props.errors.github}
          placeholder='https://github.com/'
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          value={devpost}
          label='Devpost URL'
          name='devpost'
          type='text'
          error={this.props.errors.devpost}
          placeholder='https://devpost.com/'
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <TextInputBlock
          value={dietary_restrictions}
          error={this.props.errors.dietary_restrictions}
          label='Do you have any dietary restrictions?'
          labelType='large'
          name='dietary_restrictions'
          type='options'
          optionsType='small'
          onChange={this.props.onChange}
          options={[
            'None',
            'Vegetarian',
            'Vegan',
            'Halal',
            'Kosher',
            'Jain',
            'Hindu',
          ]}/>
        <TextInputBlock
          value={allergies}
          error={this.props.errors.allergies}
          label='List any allergies below:'
          labelType='large'
          name='allergies'
          type='text'
          placeholder='Peanuts'
          autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
          <button onClick={this._goToNextStep.bind(this)}>Continue</button>
      </div>

    );

  }

  _goToNextStep(e){
    e.preventDefault()
    this.props.dispatch(setCurrentApplyStep(4));

  }
}
