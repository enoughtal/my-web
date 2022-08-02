import 'antd/dist/antd.css'
import { Route, Routes } from 'react-router-dom'
import About from './views/About/index.jsx'
import Blog from './views/Blog/index.jsx'
import Home from './views/Home/index.jsx'
import Layout from './views/Layout/index.jsx'
import Login from './views/Login/index.jsx'
import Tictactoe from './views/Tictactoe/index.jsx'
import Todos from './views/Todos/index.jsx'

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

export default App
