import Hapi from 'hapi';
import routes from './routes';

const server = new Hapi.Server();

server.connection( {
    port: process.env.PORT || '1738'
});

server.register( require( 'hapi-auth-jwt' ), ( err ) => {

    if( !err ) {
        console.log( 'Loaded JWT' );
    }

    server.auth.strategy( 'token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: [ 'HS256' ]
        }

    } );

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
