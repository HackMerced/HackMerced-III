import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision'
import Path from 'path';
import routes from './routes';

// start server
const server = new Hapi.Server();


server.connection( {
    port: process.env.PORT || '1954',
    routes:{
      cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
});

server.register([Vision, require('hapi-auth-cookie'), Inert], ( err ) => {

  if(err){
    throw err;
  }

  const cache = server.cache(
    {
      segment: 'sessions',
      expiresIn: 3 * 24 * 60 * 60 * 1000
    });
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', {
    password: process.env.COOKIE_SECRET, //  secret
    cookie: process.env.COOKIE_NAME,
    ttl: 24 * 60 * 60 * 1000  * 30,
    redirectTo: '/contribute',
    isSecure: false,
    validateFunc: (request, session, callback) => {
          cache.get(session.sid, (err, cached) => {

              if (err) {
                  return callback(err, false);
              }

              if (!cached) {
                  return callback(null, false);
              }

              return callback(null, true, cached.account);
          });
      }
  });

  routes.forEach( ( route ) => {
      server.route( route );
  } );
} );


server.start( err => {
    if(err) {
      throw  err;
    }

    console.log( `Server started at ${ server.info.uri }` );
} );

export { server };
