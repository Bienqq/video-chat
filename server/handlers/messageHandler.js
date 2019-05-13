exports.handleMessage = (io, socket, message) => {
    const room = socket.rooms[Object.keys(socket.rooms)[1]]
    io.in(room).emit('message', message)
}

exports.notifyUser = (notifierUserNick, roomName, socketToNotify) => {
    socketToNotify.emit('sendNotification', { notifierUserNick, roomName })
}