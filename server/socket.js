module.exports = (io) => {
  const allConnection = [];
  io.on('connection', (socket) => {
    allConnection.push(socket);
    console.log('THERE IS CURRENTLY ', allConnection.length, ' SOCKETS CONNECTED');

    const playlist = socket.handshake.headers.referer.split('/')[3];

    socket.join(playlist);
    console.log('USER JOINED PLAYLIST: ', playlist);

    socket.on('new:track', (data) => {
      io.sockets.to(playlist).emit('add:track', data);
    });

    socket.on('skip:track', (data) => {
      io.sockets.to(playlist).emit('next:track', data);
    });

    socket.on('remove:track', (data) => {
      io.sockets.to(playlist).emit('delete:track', data);
    });

    socket.on('disconnect', () => {
      allConnection.shift();
    });

  });
};