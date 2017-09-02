var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('hackmerced main page');
    }
});

server.route({
    method: 'GET',
    path: '/volunteer',
    handler: function (request, reply) {
        reply('Hello, volunteer!');
    }
});

//should probably make this get post as this should be a form volunteer fills out
server.route({
    method: 'GET',
    path: '/volunteer/confirmation',
    handler: function (request, reply) {
        reply('put in volunteer info here');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});