const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const notificationHelper = require('./notificationHelper');

const service = express();
service.use(express.static(__dirname));
const server = http.createServer(service);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('connected to socket : ', socket);
    notificationHelper.receiveNPostMessage(io);
});

server.listen(3020, () => {
    console.log('Notification Service started on port 3020');
});