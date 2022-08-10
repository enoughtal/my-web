const fs = require('fs')
const path = require('path')

const PORT = 443
const GUEST_ID = 'guest'
const SESSION_TTL = 60_000 * 60 * 24 * 7//ms
const secret = '22/7/12'
const token = '22/7/13/18/57'
const rootPath = process.cwd()

/* https */
let tls
if (process.env.NODE_ENV !== 'production') {
    /* https development environment
        https://web.dev/i18n/en/how-to-use-local-https/
    */
    tls = {
        //mkcert, https://github.com/FiloSottile/mkcert
        key: fs.readFileSync(path.join(rootPath, './private/localhost/localhost-key.pem')),
        cert: fs.readFileSync(path.join(rootPath, './private/localhost/localhost.pem'))
    }
}
else {
    tls = {
        pfx: fs.readFileSync(path.join(rootPath, './private/hueyond.run_iis/hueyond.run.pfx')),
        passphrase: fs.readFileSync(path.join(rootPath, './private/hueyond.run_iis/keystorePass.txt'), 'utf8')
    }
}

module.exports = {
    PORT,
    GUEST_ID,
    SESSION_TTL,
    secret,
    token,
    rootPath,
    tls
}