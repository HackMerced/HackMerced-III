/*
  The Volunteer Object

  The Volunteer Object is the core to Tomoe's hackathon management system. Volunteers are the people who apply to your hackathon.

  {
   "_id":"user-id",
   "name":"user-name",
   "email":"hackathon@email.com",
   "status":"status",
   "availability":"hours",
   "details": {
      "age":"age",
      "dietary_restrictions":"",
      "shirt_size":"",
    }
  }

*/


import Joi from 'joi';
import Boom from 'boom';
import { volunteerHandlers } from '../handlers'
import { volunteerValidators } from '../validators'


// [GET] /volunteers
export const getVolunteers = {
    path: '/volunteers',
    method: 'GET',
    config: {
      handler: volunteerHandlers.getVolunteers,
    }
};

// [GET] /volunteers/{user-email}
// [GET] /volunteers/{user-id}
export const getVolunteer = {
    path: '/volunteers/{user}',
    method: 'GET',
    config: {
      handler: volunteerHandlers.getVolunteer,
    }
};

// [POST] /volunteers
export const postVolunteer = {
    path: '/volunteers',
    method: 'POST',
    config: {
      handler: volunteerHandlers.postVolunteer,
      validate: volunteerValidators.postVolunteer
    }
};

// [POST] /volunteers/{user-email}
// [POST] /volunteers/{user-id}
export const updateVolunteer = {
    path: '/volunteers/{user}',
    method: 'POST',
    config: {
      handler: volunteerHandlers.updateVolunteer,
    }
};

// [DELETE] /volunteers/{user-email}
// [DELETE] /volunteers/{user-id}
export const deleteVolunteer = {
    path: '/volunteers/{user}',
    method: 'DELETE',
    config: {
      handler: volunteerHandlers.deleteVolunteer,
    }
};

// [POST] /volunteers/{user-email}/status
// [POST] /volunteers/{user-id}/status
export const updateVolunteerStatus = {
    path: '/volunteers/{user}/status',
    method: 'POST',
    config: {
      handler: volunteerHandlers.updateVolunteerStatus,
      validate: volunteerValidators.updateVolunteerStatus
    }
};


const volunteerRoutes = [
  getVolunteers,
  getVolunteer,
  postVolunteer,
  updateVolunteer,
  deleteVolunteer,
  updateVolunteerStatus
]

export default volunteerRoutes;
