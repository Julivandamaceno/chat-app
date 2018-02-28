const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('connection made');

    socket.on('disconnect', () => {
        console.log('browser disconnected');
    });

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hello',
        createAt: 123
    });
    
    socket.on('createMessage', (message) => {
        console.log(message);
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => console.log(`Server up at ${port}`));