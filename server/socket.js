module.exports = (io) => {
  const allConnection = [];
  const allRooms = {};
  io.on('connection', (socket) => {
    allConnection.push(socket);
    console.log('THERE IS CURRENTLY ', allConnection.length, ' SOCKETS CONNECTED');

    const playlist = socket.handshake.headers.referer.split('/')[3];

    socket.join(playlist);
    console.log('USER JOINED PLAYLIST: ', playlist);

    if (!allRooms[playlist] || allRooms[playlist].length === 0) {
      allRooms[playlist] = [socket];
    } else {
      allRooms[playlist].push(socket);
      io.sockets.to(playlist).emit('new:user');
    }

    socket.on('current:track', (data) => {
      io.sockets.to(playlist).emit('catch:up', data);
    });

    socket.on('new:track', (data) => {
      io.sockets.to(playlist).emit('add:track', data);
    });

    socket.on('skip:track', (data) => {
      io.sockets.to(playlist).emit('next:track', data);
    });

    socket.on('remove:track', (data) => {
      io.sockets.to(playlist).emit('delete:track', data);
    });

    socket.on('update:progress', (data) => {
      io.sockets.to(playlist).emit('progress:track', data);
    });

    socket.on('gonged:track', (data) => {
      console.log('PLAYLIST ', playlist, ' ', data);
      io.sockets.to(playlist).emit('gong:track', data);
    });

    socket.on('disconnect', () => {
      allConnection.shift();
      allRooms[playlist].shift();
    });

  });
};