import { PROVIDE_NICK } from '../constants/actionTypes'

export const provideNick = (nick) => {
    return {
        type: PROVIDE_NICK,
        payload: {
            userNick: nick,
        }
    }
}