import hackerRoutes from './hacker';
import adminRoutes from './admin';
import volunteerRoutes from './volunteer';

const routes = [
  ...hackerRoutes,
  ...adminRoutes,
  ...volunteerRoutes,
];

export default routes;
