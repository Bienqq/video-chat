exports.handleMessage = (socket, message) => {
    const room = socket.rooms[Object.keys(socket.rooms)[1]]
    socket.broadcast.to(room).emit('message', message)   
}

exports.notifyUser = (notifierUserNick, roomName, socketToNotify) => {
    socketToNotify.emit('sendNotification', { notifierUserNick, roomName })
}