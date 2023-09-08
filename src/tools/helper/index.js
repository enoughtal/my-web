import { token } from '../../../global.cjs';

/* 生成带主题的类名 */
export function themeClass(theme, className = '') {
  return `${className}${theme === 'dark' ? ' dark-theme' : ''}`;
}

export function themeId(theme, id) {
  return `${id}${theme === 'dark' ? '-dark-theme' : ''}`;
}

/*
 ** web fetch api
 */
/* POST */
export async function postData(url, data = {}, handle = 'json') {
  const msg = { fail: true };

  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      //Web/API/Response
      return res[handle]();
    } else {
      return msg;
    }
  } catch (err) {
    return msg;
  }
}

/* GET */
export async function getData(url) {
  const msg = { fail: true };

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        token,
      },
    });

    if (res.ok) {
      return res.json();
    } else {
      return msg;
    }
  } catch (err) {
    return msg;
  }
}
