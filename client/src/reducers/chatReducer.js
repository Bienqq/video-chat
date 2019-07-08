import {
    USER_TO_CHAT_SELECTED,
    UPDATE_ALL_USERS_ONLINE,
    NICK_PROVIDED,
    CONNECT_SOCKET,
} from '../constants/actionTypes'

const initState = {
    socket: null,
    userToChat: '',
    userNick: '',
    allUsersOnline: [],
}

const chatReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case CONNECT_SOCKET:
            return {
                ...state,
                socket: payload.socket
            }
        case USER_TO_CHAT_SELECTED:
            return {
                ...state,
                userToChat: payload.userToChat
            }
        case UPDATE_ALL_USERS_ONLINE:
            return {
                ...state,
                allUsersOnline: payload.allUsersOnline
            }
        case NICK_PROVIDED:
            return {
                ...state,
                userNick: payload.userNick
            }
        default:
            return state
    }
}

export default chatReducer