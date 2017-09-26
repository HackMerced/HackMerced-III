/**
 * Form.react.js
 *
 * The contact page is just a huge form that which
 * is controlled from the application stage
 *
 */

 import React, { Component } from 'react';
 import { TextInputBlock } from '../partials/';
 //include the third import 

 const assign = Object.assign || require('object.assign');

 export class ContactForm extends Component {

 	render() {
	    return (
	      <h3>Questions? Comments? Kudos?</h3>
	      <h3> Contact us here!</h3>

	      <form method="POST" action="http://formspree.io/hello@hackmerced.com" >

	        <input type="email" name="email" placeholder="Your email">
	  		
	  		<textarea name="message" placeholder="Your message"></textarea>

			<button className='object--center button--gold'>Submit</button>	      
	      </form>
	    );
  	}
}