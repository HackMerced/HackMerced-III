import Joi from 'joi';

export const volunteerValidators = {
	postVolunteer:{
		payload:{
			name: Joi.string().required(),
			age: Joi.number().integer().min(18).max(121).required().options({ language: { any: { allowOnly: 'Sorry we only allow people older than age 18 and younger than 121!' } } }),
			email: Joi.string().required().email(),
			friday_availability: Joi.string().required(),
			saturday_availability: Joi.string().required(),
			sunday_availability: Joi.string().required(),
			dietary_restrictions: Joi.string().required(),
			shirt_size: Joi.string().required()
		}
	}
}
