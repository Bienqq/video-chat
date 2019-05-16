export const provideNick = (nick) => {
    return {
        nick,
        type: 'PROVIDE_NICK',
    }
}