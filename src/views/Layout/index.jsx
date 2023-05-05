import { Message, useMessage } from '@cdztt/message-react'
import Tooltip from '@cdztt/tooltip-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { saveTodos, selectDirtyTodos } from '../../store/todos'
import userSlice, { getUserFromSession, logout, savePreference, saveTic } from '../../store/user'
import { themeClass } from '../../tools/helper'
import { useDebounce, useLock } from '../../tools/hooks'
import { DELAY_TIME, GUEST_ID } from '../../tools/variables'
import './index.sass'
import logo from './logo.png'

function Layout() {
    const theme = useSelector(state => state.user.preference.theme)
    const tic = useSelector(state => state.user.tic)
    const userId = useSelector(state => state.user.userId)
    const username = useSelector(state => state.user.username)
    const dirtyTodos = useSelector(selectDirtyTodos)
    const notice = useSelector(state => state.notice)
    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [locked, lock] = useLock()

    const message = useMessage()

    const isAuth = userId !== GUEST_ID
    const ticData = {
        tic,
        userId
    }

    /* 设置浏览器标题 */
    useEffect(() => {
        document.title = `${location.pathname.slice(1)} | hueyond`
    }, [location.pathname])

    /* 根据cookie获取用户信息 */
    useEffect(() => {
        dispatch(getUserFromSession())
    }, [dispatch])

    /* theme变更后n秒上传至服务器 */
    const debouncedTheme = useDebounce(theme, DELAY_TIME)
    useEffect(() => {
        if (isAuth) {
            const data = {
                theme: debouncedTheme,
                userId
            }
            dispatch(savePreference(data))
        }
    }, [debouncedTheme, dispatch, isAuth, userId])

    /* 注册登录登出消息提示 */
    useEffect(() => {
        if (notice.success) {
            message.show({ content: notice.msg, type: 'success' })
        }
        else if (notice.msg){
            message.show({ content: notice.msg, type: 'warning' })
        }
    }, [message, notice.msg, notice.success])

    /* 导航至登录 */
    const navLogin = () => {
        if (!locked) {
            lock()
            navigate('/login', { state: { from: location } })
        }
    }

    /* 登出，只是点击事件，不是导航 */
    const out = () => {
        if (dirtyTodos) {
            dispatch(saveTodos(dirtyTodos))
        }
        dispatch(saveTic(ticData))
        dispatch(logout())
    }

    const user = !isAuth
        ? <span>{username}</span>
        : <span className='myapp-layout-header-user-registered'>{`Hi, ${username}`}</span>

    const signButton = !isAuth
        ? <span onClick={navLogin}>登录</span>
        : <span onClick={out}>登出</span>

    const themeButton =
        <span className='myapp-layout-header-theme-button none-user-select'
            onClick={() => dispatch(userSlice.actions.toggleTheme())}
        >
            {theme === 'dark'
                ? '☀️'
                : '🌑'}
            <Tooltip place='bottom-left'
                size={0.8}
            >
                主题
            </Tooltip>
        </span>

    return (
        <div className='myapp-layout'>
            <header className='myapp-layout-header'>
                <div className='myapp-layout-header-logo'
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img src={logo}
                        alt='logo'
                    />
                    <Tooltip place='bottom'
                        size={0.8}
                    >
                        首页
                    </Tooltip>
                </div>

                <nav className='myapp-layout-header-nav'>
                    <div className='myapp-layout-header-nav-dropdown'
                        onMouseLeave={() => setDropdown(false)}
                    >
                        <div className='myapp-layout-header-nav-dropdown-button'
                            onClick={() => setDropdown(true)}
                        >
                            Menu
                        </div>
                        {dropdown &&
                        <div className='myapp-layout-header-nav-dropdown-vertical'>
                            <div>
                                <NavLink to='/blog'
                                    className={({ isActive }) =>
                                        isActive
                                        ? 'myapp-layout-header-nav-dropdown-vertical-active'
                                        : ''}
                                >
                                    Blog
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/todos'
                                    className={({ isActive }) =>
                                        isActive
                                        ? 'myapp-layout-header-nav-dropdown-vertical-active'
                                        : ''}
                                >
                                    TO DO
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/tictactoe'
                                    className={({ isActive }) =>
                                        isActive
                                        ? 'myapp-layout-header-nav-dropdown-vertical-active'
                                        : ''}
                                >
                                    Tic Tac Toe
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/about'
                                    className={({ isActive }) =>
                                        isActive
                                        ? 'myapp-layout-header-nav-dropdown-vertical-active'
                                        : ''}
                                >
                                    About
                                </NavLink>
                            </div>
                        </div>}
                    </div>


                    <div className='myapp-layout-header-nav-horizontal'>
                        <span className='myapp-layout-header-nav-horizontal-link'>
                            <NavLink to='/blog'
                                className={({ isActive }) =>
                                    isActive
                                    ? 'myapp-layout-header-nav-horizontal-link-active'
                                    : ''}
                            >
                                Blog
                                <Tooltip place='bottom-left'
                                    size={0.8}
                                >
                                    笔记
                                </Tooltip>
                            </NavLink>
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-seperator'>
                            |
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-link'>
                            <NavLink to='/todos'
                                className={({ isActive }) =>
                                    isActive
                                    ? 'myapp-layout-header-nav-horizontal-link-active'
                                    : ''}
                            >
                                TO DO
                                <Tooltip place='bottom-left'
                                    size={0.8}
                                >
                                    土豆
                                </Tooltip>
                            </NavLink>
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-seperator'>
                            |
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-link'>
                            <NavLink to='/tictactoe'
                                className={({ isActive }) =>
                                    isActive
                                    ? 'myapp-layout-header-nav-horizontal-link-active'
                                    : ''}
                            >
                                Tic Tac Toe
                                <Tooltip place='bottom-left'
                                    size={0.8}
                                >
                                    井字棋
                                </Tooltip>
                            </NavLink>
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-seperator'>
                            |
                        </span>
                        <span className='myapp-layout-header-nav-horizontal-link'>
                            <NavLink to='/about'
                                className={({ isActive }) =>
                                    isActive
                                    ? 'myapp-layout-header-nav-horizontal-link-active'
                                    : ''}
                            >
                                About
                                <Tooltip place='bottom-left'
                                    size={0.8}
                                >
                                    关于我
                                </Tooltip>
                            </NavLink>
                        </span>
                    </div>
                </nav>

                <div className='myapp-layout-header-theme'>
                    {themeButton}
                </div>

                <div className='myapp-layout-header-user'>
                    {user}
                    <Tooltip place='bottom'
                        size={0.8}
                    >
                        {username} , 你好
                    </Tooltip>
                </div>

                <div className='myapp-layout-header-sign'>
                    {signButton}
                </div>

            </header>

            <main className={themeClass(theme, 'myapp-layout-main')}>
                <div className='myapp-layout-main-placeholder'></div>
                <Outlet />
            </main>
        </div>
    )
}

export default function LayoutWrapper() {
    return (
        <Message>
            <Layout></Layout>
        </Message>
    )
}