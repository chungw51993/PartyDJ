module.exports = (io) => {
  const allConnection = [];
  io.on('connection', function(socket) {
    allConnection.push(socket);

    socket.on('new:track', (data) => {
      console.log('EMIT NEW TRACK');
      io.sockets.emit('add:track', data);
    });

  });
};