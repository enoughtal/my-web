import { guestState } from '../../global.cjs'
import render from '../../src/ssr.js'
import { _whoVisit } from '../users/index.js'

// eslint-disable-next-line no-unused-vars
async function getPage(req, res, next) {
    const url = req.originalUrl
    const user = await _whoVisit(req)
    let userState = guestState

    if (user.username) {//真实用户
        userState = { ...guestState, ...user }
    }

    render(url, userState, res)
}

export default function pagesRoute(app) {
    app.get(['/', '/blog', '/todos', '/tictactoe', '/about', '/login'], getPage)
}