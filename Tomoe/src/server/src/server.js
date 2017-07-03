import Hapi from 'hapi';
import routes from './routes';

// start server
const server = new Hapi.Server();
const Relish = require('relish')({
  stripQuotes: true,
  messages: {
    'email': 'You did not provide an email!',
    'password': 'You did not provide a password!',
    'confirmPassword': 'You did not confirm your password!'
  }
})

server.connection( {
    port: process.env.PORT || '1738',
    routes: {
      validate: {
        failAction: Relish.failAction
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
