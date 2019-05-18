import {
    PROVIDE_NICK,
    USER_TO_CHAT_SELECTED,
    UPDATE_ALL_USERS_ONLINE,
    JOIN_ROOM
} from '../constants/actionTypes'

export const provideNick = nick => {
    return {
        type: PROVIDE_NICK,
        payload: {
            userNick: nick,
        }
    }
}

export const userToChatSelected = userToChat => {
    return {
        type: USER_TO_CHAT_SELECTED,
        payload: {
            userToChat: userToChat
        }
    }
}

export const updateAllUsersOnline = allUsersOnline => {
    return {
        type: UPDATE_ALL_USERS_ONLINE,
        payload: {
            allUsersOnline: allUsersOnline
        }
    }
}

export const joinRoom = roomName => {
    return {
        type: JOIN_ROOM,
        payload: {
            roomName: roomName
        }
    }
}