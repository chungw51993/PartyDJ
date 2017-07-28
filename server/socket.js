module.exports = (io) => {
  const allConnection = [];
  io.on('connection', function(socket) {
    allConnection.push(socket);
    console.log('THERE IS CURRENTLY ', allConnection.length, ' SOCKETS CONNECTED');
    const room = socket.handshake.headers.referer.split('/')[3];
    console.log(socket.handshake.headers.referer.split('/')[3]);

    socket.on('new:track', (data) => {
      console.log('EMIT NEW TRACK');
      io.sockets.emit('add:track', data);
    });

  });
};