const fs = require('fs')
const path = require('path')

const PORT = 443
const GUEST_ID = 'guest'
const SESSION_TTL = 60_000 * 60 * 24 * 7//ms
const secret = '22/7/12'
const token = '22/7/13/18/57'
const guestState = {
    userId: GUEST_ID,
    username: '访客',
    preference: {
        theme: 'light',
        element: '🔥'
    },
    tic: {
        totalScore: 0,
        lose: 0,
        count: 0
    },
}
const dataHost = process.env._DATA_HOST
const dataPort = process.env._DATA_PORT
const LOGIN_PATH = '/login'
const DELAY_TIME = 5_000
const ELEMENT = ['🔥', '🗻', '⚡', '🌊']
const scoreValues = [2, 3, 20, 300]
const powerValues = [0, 10, 30, 100, 500]
const prizeEmojiArr = ['', '🪨', '🪙', '👑', '💎']
const prizeTextArr = ['-', '孤者', '勇者', '孤勇者', '孤独患者']

/* https */
function getTls() {
    let tls
    if (process.env.NODE_ENV !== 'production') {
        /* https development environment
            https://web.dev/i18n/en/how-to-use-local-https/
        */
        tls = {
            //mkcert, https://github.com/FiloSottile/mkcert
            key: fs.readFileSync(path.join(process.cwd(), './private/localhost/localhost-key.pem')),
            cert: fs.readFileSync(path.join(process.cwd(), './private/localhost/localhost.pem'))
        }
    }
    else {
        tls = {
            pfx: fs.readFileSync(path.join(process.cwd(), './private/hueyond.run_iis/hueyond.run.pfx')),
            passphrase: fs.readFileSync(path.join(process.cwd(), './private/hueyond.run_iis/keystorePass.txt'), 'utf8')
        }
    }

    return tls
}

module.exports = {
    PORT,
    GUEST_ID,
    SESSION_TTL,
    secret,
    token,
    getTls,
    guestState,
    dataHost,
    dataPort,
    LOGIN_PATH,
    DELAY_TIME,
    ELEMENT,
    scoreValues,
    powerValues,
    prizeEmojiArr,
    prizeTextArr
}