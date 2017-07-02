import Hapi from 'hapi';
import routes from './routes';

let ConfigRoute = 'tomoe.config.js'
if(process.env.NODE_ENV === 'test'){
  ConfigRoute = 'tomoe.test.config.js'
}

import { secretKey } from `../../../../${ConfigRoute}`;

const server = new Hapi.Server();

server.connection( {
    port: process.env.PORT || '1738'
});

server.register( require( 'hapi-auth-jwt' ), ( err ) => {

    if( !err ) {
        console.log( 'Loaded JWT' );
    }

    server.auth.strategy( 'token', 'jwt', {
        key: secretKey,
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
