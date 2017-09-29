import adminRoutes from './admin';
import volunteerRoutes from './volunteer';

import { getExtensionContent } from '../util';

const routes = [
  ...adminRoutes,
  ...volunteerRoutes,
  ...getExtensionContent('routes'),
];

export default routes;
