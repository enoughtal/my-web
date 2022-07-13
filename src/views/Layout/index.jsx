import { message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { saveTodos, selectDirtyTodos } from '../../store/todos'
import userSlice, { getUserFromSession, logout, savePreference, saveTic, selectTitle } from '../../store/user'
import { themeClass } from '../../tools/helper'
import { useDebounce, useLock } from '../../tools/hooks'
import { DELAY_TIME, GUEST_ID } from '../../tools/variables'
import './index.sass'

export default function Layout() {
    const theme = useSelector(state => state.user.preference.theme)
    const title = useSelector(selectTitle)
    const tic = useSelector(state => state.user.tic)
    const userId = useSelector(state => state.user.userId)
    const username = useSelector(state => state.user.username)
    const dirtyTodos = useSelector(selectDirtyTodos)
    const notice = useSelector(state => state.notice)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [locked, lock] = useLock()

    const isAuth = userId !== GUEST_ID
    const ticData = {
        tic,
        userId
    }

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
            message.success(notice.msg)
        }
        else if (notice.msg){
            message.warning(notice.msg)
        }
    }, [notice])

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
        : <span className='myapp-layout-header-user-registered'>{`${title[0]} ${username}`}</span>

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
        </span>

    return (
        <div className='myapp-layout'>
            <header className='myapp-layout-header'>
                <div className='myapp-layout-header-logo' />

                <div className='myapp-layout-header-text'>
                    <span onClick={() => navigate('/')}>
                        &lt;<code>he</code>苏安<code>guo</code>土著<code>de</code>部落<code>ge</code> /&gt;
                    </span>
                </div>

                <nav className='myapp-layout-header-nav'>
                    <span>
                        <NavLink to='/todos'
                            className={({ isActive }) =>
                                isActive ? 'myapp-layout-header-nav-link-active' : undefined
                            }
                        >
                            TO DO
                        </NavLink>
                    </span>
                    {' | '}
                    <span>
                        <NavLink to='/tictactoe'
                            className={({ isActive }) =>
                                isActive ? 'myapp-layout-header-nav-link-active' : undefined
                            }
                        >
                            Tic Tac Toe
                        </NavLink>
                    </span>
                </nav>

                <div className='myapp-layout-header-user'>
                    {user}
                </div>

                <div className='myapp-layout-header-sign'>
                    {signButton}
                </div>

                <div className='myapp-layout-header-theme'>
                    {themeButton}
                </div>
            </header>

            <main className={themeClass(theme, 'myapp-layout-main')}>
                <Outlet />
            </main>
        </div>
    )
}