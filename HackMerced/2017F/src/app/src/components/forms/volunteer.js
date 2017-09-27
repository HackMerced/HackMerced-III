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
    const { errors, data } = this.props;

    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Interested in helping out HackMerced?</h3>
        <h3> Become a volunteer!</h3>
        <TextInputBlock
          error={errors.name}
          value={data.name}
          name='name'
          type='text'
          label='Name'
          placeholder='Your Full Name' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={errors.email}
          value={data.email}
          name='email'
          type='text'
          label='Email'
          placeholder='Your Email' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          error={errors.age}
          value={data.age}
          name='age'
          type='number'
          label='Age'
          placeholder='Your Age' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

        <TextInputBlock
          value={data.dietary_restrictions}
          error={errors.dietary_restrictions}
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
          value={data.shirt_size}
          error={errors.shirt_size}
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
            '4XL',
          ]}/>

        <TextInputBlock
          value={data.friday_availability}
          error={errors.friday}
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
          value={data.saturday_availability}
          error={errors.saturday}
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
          value={data.sunday_availability}
          error={errors.sunday}
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

  _onChange(event) {
    let newState = this._mergeWithCurrentState({
      [event.target.name]: event.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState (change) {
    const { data } = this.props;
    return assign(data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange (newState) {
    this.props.dispatch(updateVolunteerForm(newState));
  }

  _onSubmit (event) {
    const { dispatch, data } = this.props

    event.preventDefault()

    dispatch(signUpVolunteer({
      name: data.name,
      email: data.email,
      age: data.age,
      friday_availability: data.friday_availability,
      saturday_availability: data.saturday_availability,
      sunday_availability: data.sunday_availability,
      dietary_restrictions: data.dietary_restrictions,
      shirt_size: data.shirt_size,
    }))
  }
}
