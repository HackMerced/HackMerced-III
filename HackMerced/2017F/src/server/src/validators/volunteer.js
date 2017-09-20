import Joi from 'joi';

export const volunteerValidators = {
	postVolunteer:{
		//tomoe
	},
	
	getMe:{
		payload:{
	    	id: Joi.string().required()
	    }
    },

    postSubmit:{
		payload:{
			name: Joi.string().required(),
			age: Joi.number().integer().min(14).max(121).required().options({ language: { any: { allowOnly: 'Sorry we only allow people older than age 14 and younger than 121!' } } }),
			email: Joi.string().required(),
			availability: Joi.string().required(),
			dietary_restrictions: Joi.string().required(),
			shirt_size: Joi.string().required()
		}
	}
}


	