import { volunteerHandlers } from '../handlers'
import { volunteerValidators } from '../validators'

export const postVolunteer = {
	path: '/volunteer',
	method: 'POST',
	config: {
		handler: volunteerHandlers.postVolunteer,
		validate: volunteerValidators.postVolunteer,
	}
};

const volunteerRoutes = [
	postVolunteer,
]

export default volunteerRoutes;
