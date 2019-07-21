const dns = require('dns')
const os = require('os')
const User = require('./models/User')
const EVENT_TYPES = require('./constants/eventTypes')
const app = require('express')()

// init socket.IO server
const socketServer = require('http').createServer(app)
const io = require('socket.io')(socketServer)

// init P2P broker server
const PeerServer = require('peer').PeerServer;
const peerjsServer = PeerServer({ port: process.env.PEER_SERVER_PORT, path: process.env.PATH, proxied: true })
peerjsServer.on('connection', client => {
	console.log(`Client ${client} connected to broker server`)
	// console.log(server._clients)
})

const allUsers = []

// socket.IO events handling
io.on('connection', socket => {
	const connectedUserNick = socket.request._query.nick
	console.log(`User ${connectedUserNick} connected to socket IO server`)
	allUsers.push(new User(connectedUserNick, socket))

	socket.on('disconnect', () => {
		const userNick = socket.request._query.nick
		console.log(`User ${userNick} leave chat!`)
		// removing leaving user from all users
		allUsers.splice(allUsers.indexOf(socket), 1)
	})

	//events handling

	// forwarding invitations between users
	socket.on(EVENT_TYPES.INVITE_USER_TO_CHAT, (userToBeInvited, answerCallbackFn) => {
		const inviterUser = allUsers.find(user => user.socket === socket).nick
		const socketToBeInvited = allUsers.find(user => user.nick === userToBeInvited).socket
		socketToBeInvited.emit(EVENT_TYPES.INVITE_USER_TO_CHAT, inviterUser, answer => {
			answerCallbackFn(answer)
		})
	})

	socket.on(EVENT_TYPES.START_PEER_CONNECTION, userToChat => {
		const socketToInit = allUsers.find(user => user.nick === userToChat).socket
		socketToInit.emit(EVENT_TYPES.START_PEER_CONNECTION)
	})

})

dns.lookup(os.hostname(), (error, address, fam) => {
	if (!error) {
		console.log('-------------------APLICATION STARTED-------------------')
		console.log(`Hostname : ${os.hostname()}`)
		console.log(`IP : ${address}`)
		const peerJsServerAddress = `http://${address}:${process.env.PEER_SERVER_PORT}${process.env.PATH_PEER}`
		const socketServerAddress = `http://${address}:${process.env.SOCKET_SERVER_PORT}`
		console.log(`P2P Broker server is listening at : ${peerJsServerAddress}`)
		socketServer.listen(process.env.SOCKET_SERVER_PORT, () => {
			console.log(`Socket server is listening at : ${socketServerAddress}`)

		})
	} else {
		console.error(error)
	}
})

setInterval(() => {
	console.log(`Contected users: ${allUsers.length}`)
	allUsers.forEach(user => console.log(user.nick))
	io.sockets.emit(EVENT_TYPES.ALL_USERS_ONLINE, allUsers.map(user => user.nick))
}, 2000)