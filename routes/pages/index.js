import render from '../../src/ssr.js'

async function getPage(req, res, next) {
    const url = req.originalUrl
    render(url, res)
}

export default function pagesRoute(app) {
    app.get(['/', '/blog', '/todos', '/tictactoe', '/about', '/login'], getPage)
}