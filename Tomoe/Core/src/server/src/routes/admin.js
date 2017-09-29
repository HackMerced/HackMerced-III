import Joi from 'joi';
import Boom from 'boom';
import { adminHandlers } from '../handlers'
import { adminValidators } from '../validators'

// [GET] /admins
export const getAdmins = {
    path: '/admins',
    method: 'GET',
    config: {
      handler: adminHandlers.getAdmins,
    }
};

// [GET] /admins/{user-email}
// [GET] /admins/{user-id}
export const getAdmin = {
    path: '/admins/{user}',
    method: 'GET',
    config: {
      handler: adminHandlers.getAdmin,
    }
};

// [POST] /admins
export const postAdmin = {
    path: '/admins',
    method: 'POST',
    config: {
      handler: adminHandlers.postAdmin,
      validate: adminValidators.postAdmin
    }
};

// [POST] /admins/{user-email}
// [POST] /admins/{user-id}
export const updateAdmin = {
    path: '/admins/{user}',
    method: 'POST',
    config: {
      handler: adminHandlers.updateAdmin,
    }
};

// [DELETE] /admins/{user-email}
// [DELETE] /admins/{user-id}
export const deleteAdmin = {
    path: '/admins/{user}',
    method: 'DELETE',
    config: {
      handler: adminHandlers.deleteAdmin,
    }
};

// [POST] /admins/{user-email}/validate
// [POST] /admins/{user-id}/validate
export const validateAdmin = {
    path: '/admins/{user}/validate',
    method: 'POST',
    config: {
      handler: adminHandlers.validateAdmin,
      validate: adminValidators.validateAdmin
    }
};

// [POST] /admins/{user-email}/permissions
// [POST] /admins/{user-id}/permissions
export const updateAdminPermissions = {
    path: '/admins/{user}/permissions',
    method: 'POST',
    config: {
      handler: adminHandlers.updateAdminPermissions,
      validate: adminValidators.updateAdminPermissions
    }
};

const adminRoutes = [
  getAdmins,
  getAdmin,
  postAdmin,
  updateAdmin,
  deleteAdmin,
  validateAdmin,
  updateAdminPermissions
]

export default adminRoutes;
