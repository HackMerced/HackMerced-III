/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateVolunteerForm} from '../../actions';

const assign = Object.assign || require('object.assign');

export class VolunteerForm extends Component {
  render() {
    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Volunteer Form</h3>
        <TextInputBlock
          error={this.props.errors.name}
          value={this.props.data.name}
          name='name'
          type='number'
          label='Name'
          placeholder='Your Full Name' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={this.props.errors.name}
          value={this.props.data.name}
          name='email'
          type='text'
          label='Email'
          placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={this.props.errors.age}
          value={this.props.data.age}
          name='age'
          type='number'
          label='Age'
          placeholder='Your Age' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={this.props.errors.dietary_restrictions}
          value={this.props.data.dietary_restrictions}
          name='dietary_restrictions'
          type='text'
          label='Dietary Restrictions'
          labelType='large'
          placeholder=' Dietary Restrictions' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={this.props.errors.shirt_size}
          value={this.props.data.shirt_size}
          name='shirt_size'
          type='text'
          label='Shirt Size'
          placeholder='Size' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
  
        <button className='object--center button--gold'>Submit</button>
      </form>
    );
  }

  _onChange(event){
    let newState = this._mergeWithCurrentState({
      [event.target.name]: event.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(updateVolunteerForm(newState));
  }

  _onSubmit(event){
    event.preventDefault();

    this.props.dispatch(updateVolunteerForm({
      name: this.props.data.name,
      age: this.props.data.age,
      availibility: this.props.data.availibility,
      dietary_restrictions: this.props.data.dietary_restrictions,
      shirt_size: this.props.data.shirt_size
    }))


  }
}
