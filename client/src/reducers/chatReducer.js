import {
    PROVIDE_NICK,
    USER_TO_CHAT_SELECTED,
    UPDATE_ALL_USERS_ONLINE,
    JOIN_ROOM,
} from '../constants/actionTypes'

const initState = {
    userNick: '',
    userToChat: '',
    roomName: '',
    allUsersOnline: [],
}

const chatReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PROVIDE_NICK:
            return {
                ...state,
                userNick: payload.userNick
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
        case JOIN_ROOM:
            return {
                ...state,
                roomName: payload.roomName
            }
        default:
            return state
    }
}

export default chatReducer