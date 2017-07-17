import Hapi from 'hapi';
import Path from 'path';
import routes from './routes';
import Boom from 'boom';
import axios from 'axios';
const TOMOE_URI = process.env.TOMOE_URI;




let serverSettings = {};

if(process.env.NODE_ENV === 'production'){
  serverSettings.connections = {
      routes: {
          files: {
              relativeTo: Path.join(__dirname, '../../../app/dist')
          }
      }
  }

}

// start server
const server = new Hapi.Server(serverSettings);

const Relish = require('relish')({
  stripQuotes: true,
})


let routeSettings = {
  validate: {
    failAction: Relish.failAction,
    options: {
        abortEarly: false
    },
  },
}


if(process.env.NODE_ENV === 'development'){
  routeSettings.cors = {
      origin: ['*'],
      additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
  }
}

server.connection( {
    port: process.env.PORT || '1954',
    routes: routeSettings
});

server.register([require('hapi-auth-jwt'), require('inert')], function (err) {

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
    console.log( `Server started with ${ process.env.NODE_ENV } status` );
} );

export { server };
