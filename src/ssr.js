/* eslint-disable no-undef */
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.js';

export default function render(url, userState, res) {
  const assets = {
    'main.js': '/client/main.js',
    'main.css': '/client/main.css',
  };
  //const assets = _ASSETS
  const Router = ({ children }) => (
    <StaticRouter location={url}>{children}</StaticRouter>
  );
  let didError = false;

  const stream = renderToPipeableStream(
    <App assets={assets} userState={userState} Router={Router} />,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-Type', 'text/html');
        stream.pipe(res);
      },
      onError(e) {
        didError = true;
        console.error(e);
      },
    }
  );

  setTimeout(() => stream.abort(), 10_000);
}
