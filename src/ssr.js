import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.js'

const assets = {
    "main.js": "/client/main.js",
    "main.css": "/client/main.css"
}

export default function render(url, res) {
    let didError = false
    const Router = ({ children }) => <StaticRouter location={url}>{children}</StaticRouter>

    const stream = ReactDOMServer.renderToPipeableStream(
        <App assets={assets} Router={Router}/>,
        {
            bootstrapScripts: [assets["main.js"]],
            onShellReady() {
                res.statusCode = didError ? 500 : 200
                res.setHeader("Content-Type", "text/html")
                stream.pipe(res)
            },
            onError(x) {
                didError = true
                console.error(x)
            }
        }
    )

    setTimeout(() => stream.abort(), 10_000)
}
