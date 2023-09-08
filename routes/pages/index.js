import { guestState } from '../../global.cjs';
import render from '../../src/ssr.js';
import { _whoVisit } from '../users/index.js';

// eslint-disable-next-line no-unused-vars
async function getPage(req, res, next) {
  const url = req.originalUrl;
  let userState = guestState;

  const user = await _whoVisit(req);
  if (user?.username) {
    // 这里要用?. 否则部分浏览器会报错Cannot read properties of null (reading 'username')
    userState = { ...guestState, ...user };
  }

  render(url, userState, res);
}

export default function pagesRoute(app) {
  app.get(['/', '/blog', '/todos', '/tictactoe', '/about', '/login'], getPage);
}
