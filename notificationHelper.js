const amqp = require('amqplib/callback_api');

const MESSAGE_SERVER = process.env.RABBITMQ_BIGWIG_URL || 'amqp://localhost';
const QUEUE = 'metalAppQueue';

const receiveNPostMessage = (io) => {
    amqp.connect(MESSAGE_SERVER, (error, conn) => {
        if (error) {
            console.log('fetchMessageFromBroker : Error connecting to messaging server');
        } else if (conn) {
            conn.createChannel((err, ch) => {
                ch.assertQueue(QUEUE, { durable: false });
                ch.consume(QUEUE, (message) => {
                    console.log(`Message received : ${message.content.toString()}`);
                    let metalDetails = JSON.parse(message.content);
                    io.emit('notification', {'message' : metalDetails});
                }, { noAck: true });
            });
        }
    });
}

module.exports = {receiveNPostMessage};