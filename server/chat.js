const http = require('http')
const server = http.createServer()
const io = require('socket.io')(server)
const User = require('./models/User')
const { createRoom, deleteRoom, joinRoom, leaveRoom } = require('./handlers/roomHandler')
const { handleMessage, notifyUser } = require("./handlers/messageHandler")

const allUsers = []
const allRooms = []

io.on('connection', socket => {

	const connectedUserNick = socket.request._query.nick
	console.log(`User ${connectedUserNick} connected chat!`)
	allUsers.push(new User(connectedUserNick, socket))

	socket.on("createRoom", roomName => {
		createRoom(roomName, allRooms)
	})

	socket.on("deleteRoom", roomName => {
		deleteRoom(roomName, allRooms)
	})

	socket.on("joinRoom", roomName => {
		joinRoom(socket, roomName, allRooms)
	})

	socket.on("leaveRoom", roomName => {
		leaveRoom(socket, roomName)
	})

	socket.on('message', (message) => {
		handleMessage(io, socket, message)
	})

	socket.on('disconnect', () => {
		const userNick = socket.request._query.nick
		console.log(`User ${userNick} leave chat!`)
		// removing leaving user from all users
		allUsers.splice(allUsers.indexOf(socket), 1)
	})

	socket.on('sendNotification', data => {
		const { roomName, nick } = data
		const { nick: notifierUserNick } = allUsers.find(user => user.socket === socket)
		const { socket: socketToNotify } = allUsers.find(user => user.nick === nick)
		notifyUser(notifierUserNick, roomName, socketToNotify)
	})

})

setInterval(() => {
	console.log("contected users: " + allUsers.length)
	allUsers.forEach(user => console.log(user.nick))
	io.sockets.emit("allUsers", allUsers.map(user => user.nick))
	io.sockets.emit("allRooms", allRooms)
}, 2000)

module.exports = server