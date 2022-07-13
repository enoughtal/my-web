// global variables
let dataHost, dataPort
if (import.meta.env.PROD) {
    dataHost = 'hueyond.run'
    dataPort = 443
}
else {
    dataHost = 'localhost'
    dataPort = 444
}
export { dataHost, dataPort }
export const GUEST_ID = 'guest'
export const LOGIN_PATH = '/login'
export const DELAY_TIME = 5_000
export const ELEMENT = ['🔥', '🗻', '⚡', '🌊']
export const scoreValues = [2, 4, 20, 400]
export const powerValues = [0, 10, 30, 100, 500]
export const prizeEmojiArr = ['😄', '😜', '😎', '👑', '💎']
export const prizeTextArr = ['-', '孤者', '勇者', '孤勇者', '孤独患者']