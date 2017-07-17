import Hapi from 'hapi';
import Path from 'path';
import routes from './routes';
import Boom from 'boom';
import axios from 'axios';
const TOMOE_URI = process.env.TOMOE_URI;

// start server
const server = new Hapi.Server();


const Relish = require('relish')({
  stripQuotes: true,
})

server.connection( {
    port: process.env.PORT || '1954',
    routes:{
      cors: {
          origin: ['*'],
          additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
      },
      validate: {
        failAction: Relish.failAction,
        options: {
            abortEarly: false
        },
      },
    }
});

server.register(require('hapi-auth-jwt'), function (err) {

  if(err){
    throw err;
  }

  const validate = function (request, decodedToken, callback) {

    axios
      .get(TOMOE_URI + '/hackers/' + decodedToken.accountId)
      .then((response) => {
        return callback(false, true, response.data.results)
      }).catch((err) => {
        callback(Boom.unauthorized('Invalid Token'), false, {});
      });
    };


  server.auth.strategy('token', 'jwt', {
        key: process.env.COOKIE_SECRET,
        validateFunc: validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
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
