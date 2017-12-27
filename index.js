const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const notificationHelper = require('./notificationHelper');
const PORT = process.env.PORT || '3020';

const service = express();
service.use(express.static(__dirname));
const server = http.createServer(service);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('connected to socket : ', socket);
    notificationHelper.receiveNPostMessage(io);
});

server.listen(PORT, () => {
    console.log(`Notification Service started on port ${PORT}`);
    notificationHelper.receiveNPostMessage(io);
});