import fsp from 'fs/promises'
import path from 'path'
import { cwd, isProduction, vite } from '../../global.js'

async function getPage(req, res, next) {
    const url = req.originalUrl

    try {
        let template, render
        if (!isProduction) {
            template =await fsp.readFile(path.resolve(cwd, 'index.html'), 'utf8')
            template = await vite.transformIndexHtml(url, template)
            render = (await vite.ssrLoadModule('src/server.jsx')).render
        }
        else {
            template =await fsp.readFile(path.resolve(cwd, 'dist/client/index.html'), 'utf8')
            render = (await import('../../dist/server/server.js')).render
        }

        const html = template.replace('<!--app-->', render(url))
        res.setHeader('Content-Type', 'text/html').send(html)
    }
    catch (err) {
        if (!isProduction) {
            vite.ssrFixStacktrace(err)
        }
        next(err)
    }
}

export default function pagesRoute(app) {
    app.get(['/', '/todos', '/tictactoe', '/login'], getPage)
}