import fs from 'fs'
import path from 'path'

export const isProduction = process.env.NODE_ENV === 'production'
export const PORT = 443
export const GUEST_ID = 'guest'
export const SESSION_TTL = 60_000 * 60 * 24 * 7//ms
export const secret = '22/7/12'
export const token = '22/7/13/18/57'
export const cwd = process.cwd()

/* https */
let tls
if (!isProduction) {
    /* https development environment
        https://web.dev/i18n/en/how-to-use-local-https/
    */
    tls = {
        //mkcert, https://github.com/FiloSottile/mkcert
        key: fs.readFileSync(path.resolve(cwd, 'private/localhost/localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(cwd, 'private/localhost/localhost.pem'))
    }
}
else {
    tls = {
        pfx: fs.readFileSync(path.resolve(cwd, 'private/hueyond.run_iis/hueyond.run.pfx')),
        passphrase: fs.readFileSync(path.resolve(cwd, 'private/hueyond.run_iis/keystorePass.txt'), 'utf8')
    }
}

/* vite */
let vite
if (!isProduction) {
    vite = await (await import('vite'))
        .createServer({
            server: {
                middlewareMode: 'ssr',
                https: tls//https://vitejs.dev/config/#server-https
            },
        })
}

export { tls, vite }

