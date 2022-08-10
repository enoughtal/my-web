import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../src/store'
import About from '../src/views/About/index.jsx'
import Blog from '../src/views/Blog/index.jsx'
import Home from '../src/views/Home/index.jsx'
import Layout from '../src/views/Layout/index.jsx'
import Login from '../src/views/Login/index.jsx'
import Tictactoe from '../src/views/Tictactoe/index.jsx'
import Todos from '../src/views/Todos/index.jsx'

function App() {
    return (
        <div className='app'>
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
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)