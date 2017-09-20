/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { signUpVolunteer, updateVolunteerForm } from '../../actions';

const assign = Object.assign || require('object.assign');

export class VolunteerForm extends Component {

  render() {
    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Interested in helping out HackMerced?</h3>
        <h3> Become a volunteer!</h3>
        <TextInputBlock
          error={this.props.errors.name}
          value={this.props.data.name}
          name='name'
          type='text'
          label='Name'
          placeholder='Your Full Name' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={this.props.errors.email}
          value={this.props.data.email}
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
          value={this.props.data.dietary_restrictions}
          error={this.props.errors.dietary_restrictions}
          label='Do you have any dietary restrictions?'
          labelType='large'
          name='dietary_restrictions'
          type='options'
          optionsType='small'
          onChange={this._onChange.bind(this)}
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
          value={this.props.data.shirt_size}
          error={this.props.errors.shirt_size}
          label='Shirt Size'
          name='shirt_size'
          type='options'
          optionsType='small'
          onChange={this._onChange.bind(this)}
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

        <TextInputBlock
          value={this.props.data.friday_availability}
          error={this.props.errors.availability}
          label='Friday Availability'
          labelType='large'
          name='friday_availability'
          type='options'
          onChange={this._onChange.bind(this)}
          optionsType='small'
          options={[
            'None',
            'Morning',
            'Afternoon',
            'Evening',
          ]}/>

        <TextInputBlock
          value={this.props.data.saturday_availability}
          error={this.props.errors.availability}
          label='Saturday Availability'
          labelType='large'
          name='saturday_availability'
          type='options'
          onChange={this._onChange.bind(this)}
          optionsType='small'
          options={[
            'None',
            'Morning',
            'Afternoon',
            'Evening',
          ]}/>

        <TextInputBlock
          value={this.props.data.sunday_availability}
          error={this.props.errors.availability}
          label='Sunday Availability'
          labelType='large'
          name='sunday_availability'
          type='options'
          onChange={this._onChange.bind(this)}
          optionsType='small'
          options={[
            'None',
            'Morning',
            'Afternoon',
            'Evening',
          ]}
          helper='In order to be eligible for free HackMerced goodies, you must volunteer for a minimum of 3 hours'/>

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

    this.props.dispatch(signUpVolunteer({
      name: this.props.data.name,
      email: this.props.data.email,
      age: this.props.data.age,
      availability: {
        friday: this.props.data.friday_availability,
        saturday: this.props.data.saturday_availability,
        sunday: this.props.data.sunday_availability
      },
      dietary_restrictions: this.props.data.dietary_restrictions,
      shirt_size: this.props.data.shirt_size
    }))


  }
}
