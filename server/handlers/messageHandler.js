exports.notifyUser = (notifierUserNick, roomName, socketToNotify) => {
    socketToNotify.emit('sendNotification', { notifierUserNick, roomName })
}

exports.invitationAnswer = (user, invitationAccepted, socket) => {
    socket.emit("invitationAnswer", { user, invitationAccepted })
}