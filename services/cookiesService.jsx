import { setCookie, destroyCookie } from 'nookies'

const gameKeys = ['isHost', 'gameId', 'teamName']

export const setGameCookies = (gameCookies) => {
    gameCookies.forEach(([key, value]) => {
        setCookie(null, key, value)
    })
}

export const destroyGameCookies = () => {
    gameKeys.forEach((key) => {
        destroyCookie(null, key)
    })
}