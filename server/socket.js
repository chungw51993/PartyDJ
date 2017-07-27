module.exports = (socket) => {
  socket.on('new', (data) => {
    console.log('>>>>>>>>>>>>>>>>>>>>', data);
  });
};