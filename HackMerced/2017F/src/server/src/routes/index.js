import hackerRoutes from './hacker';
import homeRoutes from './home';

let routes = [
  ...hackerRoutes,
];

if(process.env.NODE_ENV === 'production') {
  routes = routes.concat(homeRoutes)
}

export default routes;
