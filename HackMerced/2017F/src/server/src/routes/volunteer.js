import { volunteerHandlers } from '../handlers'

export const postVolunteer = {
	path: '/volunteer',
	method: 'POST',
	config: {
		handler: volunteerHandlers.postVolunteer,
	}
};

export const getMe = {
    path: '/volunteer/me',
    method: 'GET',
    config: {
      handler: volunteerHandlers.getMe,
      auth: {
          strategy: 'token',
      }
    }
};

const volunteerRoutes = [
	postVolunteer,
	getMe,
]

export default volunteerRoutes;

