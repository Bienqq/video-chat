exports.createRoom = (roomName, allRooms) => {
	if (!allRooms.includes(roomName)) {
		allRooms.push(roomName)
		return `Room ${roomName} was created!`
	} else {
		return `Room ${roomName} already exists!`
	}
}

exports.deleteRoom = (roomName, allRooms) => {
	if (allRooms.includes(roomName)) {
		allRooms.pop(roomName)
		return `Room ${roomName} was deleted!`
	} else {
		return `Room ${roomName} does not exist!`
	}
}

exports.joinRoom = (socket, roomName, allRooms) => {
	if (allRooms.includes(roomName)) {
		const joinedRooms = Object.keys(socket.rooms)
		if(joinedRooms.includes(roomName)){
			return `You are already in this room!`
		}
		if(joinedRooms.length >= 2 ){
			socket.leave(joinedRooms[1])
		}
		socket.join(roomName)
		return `You have joined to ${roomName} room!`
	} else {
		return `Room ${roomName} does not exist!`
	}
}

exports.leaveRoom = (socket, roomName) => {
    socket.leave(roomName)
    return `You have leave ${roomName} !`
}