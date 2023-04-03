import { Server } from 'socket.io';

const io = new Server();
const clients = {};

const ELAPSED_TIME = 60000;
const DEFAULT_INTERVAL = 10000;
const PORT = 3000;

const now = Date.now();

const checkClientStatus = () => {
    Object.entries(clients).forEach(([name, lastSeen]) => {
        const elapsed = now - lastSeen;
        if (elapsed > ELAPSED_TIME) {
            console.log(`No connection with ${name}`);
        }
    });
}

setInterval(checkClientStatus, DEFAULT_INTERVAL);

io.on('connection', (socket) => {
    console.log(`Established connection with client: ${socket.id}`);

    socket.on('message', (name) => {
        console.log(`Message received: ${name}`);
        clients[name] = now;
    });

    socket.on('disconnect', () => {
        console.log(`Connection to client: ${socket.id} - aborted`);
        Object.entries(clients).forEach(([name, lastSeen]) => {
            if (clients[name] === socket.id) {
                delete clients[name];
                console.log(`Client: ${name} is disabled`);
            }
        });
    });
});

io.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});