module.exports = (socket) => {
  const allConnection = [];
  allConnection.push(socket);
  console.log(allConnection.length, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
  socket.on('new:track', (data) => {
    socket.emit('add:track', data);
  });
};