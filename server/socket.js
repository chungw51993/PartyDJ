module.exports = (socket) => {
  socket.on('new:track', (data) => {
    console.log('>>>>>>>>>>>>>>>>>', data);
    socket.emit('add:track', data);
  });
};