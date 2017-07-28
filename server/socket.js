module.exports = (io) => {
  const allConnection = [];
  io.on('connection', function(socket) {
    allConnection.push(socket);
    console.log(allConnection.length, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
    socket.on('new:track', (data) => {
      socket.emit('add:track', data);
    });
  });
};