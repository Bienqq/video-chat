import { PROVIDE_NICK, USER_TO_CHAT_SELECTED, UPDATE_ALL_USERS_ONLINE } from '../constants/actionTypes'

const initState = {
    userNick: '',
    userToChat: '',
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
        default:
            return state
    }
}

export default chatReducer