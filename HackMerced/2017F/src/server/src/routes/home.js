import Joi from 'joi';
import Boom from 'boom';
import { homeHandlers } from '../handlers'


// [GET] /
export const getHome = {
    path: '/',
    method: 'GET',
    config: {
      handler: homeHandlers.home,
    }
};


// [GET] /{param*}
export const getStatic = {
    path: '/{filename*}',
    method: 'GET',
    config: {
      handler: homeHandlers.static,
    }
};

const homeRoutes = [
  getHome,
  getStatic
]

export default homeRoutes;
