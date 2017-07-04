import hackerRoutes from './hacker';
import adminRoutes from './admin';

const routes = [
  ...hackerRoutes,
  ...adminRoutes
];

export default routes;
