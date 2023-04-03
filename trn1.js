import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const name = 'Name LastName';

socket.on('connect', () => {
    console.log('Server connection established');
});

socket.on('disconnect', () => {
    console.log('Server connection lost');
});

const sendName = () => {
    socket.emit('message', name);
    console.log(`Message sent: ${name}`);
}

setInterval(sendName, 10000);