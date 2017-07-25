/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { TextInputBlock } from '../partials';
import { updateVolForm} from '../../actions';

const assign = Object.assign || require('object.assign');

export class VolForm extends Component {
  render() {
    return (
      <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} >
        <h3>Volunteer Form</h3>
        <TextInputBlock
          error={this.props.errors.name}
          value={this.props.data.name}
          name='name'
          type='name'
          label='Name'
          placeholder='Your Full Name' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>


          <TextInputBlock
          error={this.props.errors.age}
          value={this.props.data.age}
          name='age'
          type='age'
          label='Age'
          placeholder='Your Age' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>


          <TextInputBlock
          error={this.props.errors.avail}
          value={this.props.data.avail}
          name='avail'
          type='avail'
          label='Availability'
          placeholder='Availability Hours' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>


          <TextInputBlock
          error={this.props.errors.diet}
          value={this.props.data.diet}
          name='diet'
          type='diet'
          label='Dietary Restrictions'
          placeholder=' Dietary Restrictions' autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

          <TextInputBlock
          error={this.props.errors.size}
          value={this.props.data.size}
          name='size'
          type='size'
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
    this.props.dispatch(updateVolForm(newState));
  }

  _onSubmit(event){
    event.preventDefault();

    this.props.dispatch(updateVolForm({
      name: this.props.data.name,
      age: this.props.data.age,
      avail: this.props.data.avail,
      diet: this.props.data.diet,
      size: this.props.data.size
    }))


  }
}
