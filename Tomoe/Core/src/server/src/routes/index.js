import adminRoutes from './admin';

import { getExtensionContent } from '../util';

const routes = [
  ...adminRoutes,
  ...getExtensionContent('routes'),
];

export default routes;
