import { PROVIDE_NICK } from '../constants/actionTypes'

const initState = {
    userNick: '',
    usersOnline: [],
}

const chatReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PROVIDE_NICK:
            return {
                ...state,
                userNick: payload.userNick
            }
        default:
            return state
    }
}

export default chatReducer