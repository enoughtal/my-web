import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.js'


export default function render(url, res) {
    const assets = {
        'main.js': '/client/main.js',
        'main.css': '/client/main.css',
        baseUrl: url.split('/')[1]
    }
    const Router = ({ children }) => <StaticRouter location={url}>{children}</StaticRouter>
    let didError = false

    const stream = ReactDOMServer.renderToPipeableStream(
        <App assets={assets} Router={Router} />,
        {
            bootstrapScripts: [assets['main.js']],
            onShellReady() {
                res.statusCode = didError ? 500 : 200
                res.setHeader('Content-Type', 'text/html')
                stream.pipe(res)
            },
            onError(e) {
                didError = true
                console.error(e)
            }
        }
    )

    setTimeout(() => stream.abort(), 10_000)
}
