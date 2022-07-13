import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { saveTic, selectNotLoseRate, selectPower, selectTitle } from '../../../store/user'
import { useBlocker, useChanged } from '../../../tools/hooks'
import { GUEST_ID } from '../../../tools/variables'
import '../index.sass'
import ExplainText from './ExplainText.jsx'

export default function RightPanel() {
    const tic = useSelector(state => state.user.tic)
    const userId = useSelector(state => state.user.userId)
    const power = useSelector(selectPower)
    const title = useSelector(selectTitle)
    const notLoseRate = useSelector(selectNotLoseRate)

    const isDataChanged = useChanged(tic.count)
    const isAuthChanged = useChanged(userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const ticData = useMemo(() => ({
        tic,
        userId,
    }), [tic, userId])

    const whenSave = !isAuthChanged && isDataChanged

    //保存tic
    const save = useCallback((tx) => {
        dispatch(saveTic(ticData))
        if (tx) {
            tx.retry()
        }
    }, [ticData, dispatch])
    //阻止导航
    useBlocker(save, whenSave)//在用户不变，数据改变的情况下

    //每隔多少秒保存一次
    useEffect(() => {
        const timer = setInterval(() => {
            if (whenSave) {
                save()
            }
        }, 60_000)
        return () => {
            clearInterval(timer)
        }
    }, [save, whenSave])

    const login =
        <p>
            <span className='myapp-tic-main-right-login'
                onClick={() => navigate('/login', { state: { from: location } })}
            >
                登录
            </span>
            以显示更多
        </p>

    const score =
        <div className='myapp-tic-main-right'>
            <div className='myapp-tic-main-right-score'>
                <div>
                    <div>战力：</div>
                    <div>称号：</div>
                    <div>不败率：</div>
                </div>
                <div>
                    <div>{power}</div>
                    <div>{title[1]}</div>
                    <div>{notLoseRate}</div>
                </div>
            </div>
            <div>
                <ExplainText />
            </div>
        </div>

    return userId !== GUEST_ID ? score : login
}