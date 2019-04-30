exports.handleMessage = (io, socket, message) => {
    const room = socket.rooms[Object.keys(socket.rooms)[1]]
    io.in(room).emit('message', message)
}