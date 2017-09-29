import Hapi from 'hapi';
import routes from './routes';

// start server
const server = new Hapi.Server();
const Relish = require('relish')({
  stripQuotes: true,
  messages: {
    'permissions': 'Please only enter the following permissions: ' + TOMOE_CONFIG.adminPermissions.join(', ')
  }
})

server.connection( {
    port: process.env.PORT || '1738',
    routes: {
      validate: {
        failAction: Relish.failAction,
        options: {
            abortEarly: false
        }
      }
    }
});

server.register( require( 'hapi-auth-jwt' ), ( err ) => {

    if( !err ) {
        console.log( 'Loaded JWT' );
    }

    server.auth.strategy( 'token', 'jwt', {
        key: TOMOE_CONFIG.secretKey,
        verifyOptions: {
            algorithms: [ 'HS256' ]
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
