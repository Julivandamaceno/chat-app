var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
  
    socket.emit('createMessage', {
        to: 'jen@example.com',
        text: 'Whooa'
    });
});

socket.on('disconnect', () => {
    console.log('disconected from server');
});

socket.on('newEmail', (data) => {
    console.log(data);
});

socket.on('newMessage', (data) => {
    console.log(data);
});