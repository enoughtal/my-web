import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server.js'; //https://github.com/remix-run/react-router/issues/8353
import App from './App';
import './index.css';
import store from './store';

export function render(url) {
    return ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>
    )
}