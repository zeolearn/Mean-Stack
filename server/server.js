'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os');
const http = require('http');
const express = require('express');
const RoutesConfig = require('./config/routes.conf');
const DBConfig = require('./config/db.conf');
const Routes = require('./routes/index');

const app = express();
const server = http.createServer(app);

// const socketio = require('socket.io')(server, {
//     serveClient: false,
//     // serveClient: process.env.NODE_ENV !== 'production',
//     // path: '/socket.io-client'
//     path: '/demo'
// });
// require('./config/socketio').default(socketio);


RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

server
    .listen(PORT, () => {
        // socketio.on('connection', function (socket) {
        //     socket.emit('info', { hello: 'world' })
        //     socket.on('client', function (data) {
        //         console.log('data in client channel', data)
        //     })
        // })
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`environment: ${process.env.NODE_ENV}`);
    });
