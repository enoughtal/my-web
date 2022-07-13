import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Layout from './views/Layout'
import Login from './views/Login'
import Tictactoe from './views/Tictactoe'
import Todos from './views/Todos'

function App() {
    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/todos' element={<Todos />} />
                    <Route path='/tictactoe' element={<Tictactoe />} />
                    <Route path='/login' element={<Login />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
