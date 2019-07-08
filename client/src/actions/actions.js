import {
    USER_TO_CHAT_SELECTED,
    UPDATE_ALL_USERS_ONLINE,
    NICK_PROVIDED,
    CONNECT_SOCKET,
} from '../constants/actionTypes'

export const connectSocket = socket => {
    return {
        type: CONNECT_SOCKET,
        payload: {
            socket
        }
    }
}

export const nickProvided = nick => {
    return {
        type: NICK_PROVIDED,
        payload: {
            userNick: nick
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
