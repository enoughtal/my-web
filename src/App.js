import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import store from './store'
import Layout from './views/Layout'

const About = lazy(() => import('./views/About'))
const Blog = lazy(() => import('./views/Blog'))
const Home = lazy(() => import('./views/Home'))
const Login = lazy(() => import('./views/Login'))
const Todos = lazy(() => import('./views/Todos'))
const Tictactoe = lazy(() => import('./views/Tictactoe'))

function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/todos' element={<Todos />} />
                    <Route path='/tictactoe' element={<Tictactoe />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default function App({ assets = {}, Router }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="data:,"/>
                <link rel="stylesheet" href={assets["main.css"]} />
            </head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<b>Enable JavaScript to run this app.</b>`
                    }}
                />
                <div>
                    <Provider store={store}>
                        <Router>
                            <Page />
                        </Router>
                    </Provider>
                </div>
                {/*<script
                    dangerouslySetInnerHTML={{
                        __html: `assetManifest = ${JSON.stringify(assets)};`
                    }}
                />*/}
            </body>
        </html>
    )
}
