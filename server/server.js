const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const {generateMessage} = require('./utils/message');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('browser disconnected');
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined')) ;

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => console.log(`Server up at ${port}`));