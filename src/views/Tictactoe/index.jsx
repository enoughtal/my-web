//import { message } from 'antd'
import { useMessage } from '@cdztt/message-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userSlice from '../../store/user'
import Ai from '../../tools/game/Ai'
import Game from '../../tools/game/Game'
import { GUEST_ID } from '../../tools/variables'
import GameBoard from './GameBoard'
import LeftPanel from './LeftPanel'
import './index.sass'

const cheatPattern = [
    [1, 2, 2],
    [1, 1, 2],
    [2, 1, 1]
]

export default function Tictactoe() {
    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch()

    const [mode, setMode] = useState('1')
    const [level, setLevel] = useState('easy')
    //game是一个对象，除非setGame，game始终指向同一个引用，通过修改game属性实现棋盘显示的更新
    const [game, setGame] = useState(new Game(mode))
    const [ai, setAi] = useState(new Ai(level))
    const [step, setStep] = useState(0)//用来刷新棋盘
    const [active, setActive] = useState(false)
    const [winCoordinates, setWinCoordinates] = useState([])

    const isAuth = userId !== GUEST_ID
    const currentStep = game.getCurrentStep()
    const isCurrent = step === currentStep
    const snapshot = game.getHistorySnapshot(step)//根据step的改变而改变

    const message = useMessage()

    //作弊
    useEffect(() => {
        if (cheatPattern.flat().join('') === snapshot.flat().join('')
            && mode === '0'
            && isAuth
        ) {//登录，练习模式，符合作弊图形
            dispatch(userSlice.actions.refleshTic('win-hard'))
        }
    }, [dispatch, isAuth, mode, snapshot])

    //落子操作
    const dropPiece = useCallback((x, y) => {
        if (active) {
            if (!isCurrent) return//在历史快照里试图走子是无效的

            const result = game.judgeAndRecord(x, y)
            //无效位置不落子，比如游戏已结束，点击已经有子的格子
            if (!result.done && result.info === 'ignore') return

            ////到这里，Game类已确定落子，前端执行落子操作
            if (mode !== '0') {//非练习模式才用ai
                ai.input('' + x + y, game.getCurrentPlayer().getOrder().toString())
            }
            setStep(step => step + 1)
            if (!result.done) return

            //到这里，游戏结束
            let msg = ''
            let gameResult = ai.level
            if (result.info === 'draw') {
                msg += '平局'
                gameResult = 'draw-' + gameResult
            }
            else {
                setWinCoordinates(result.winCoordinates)

                msg += `${result.info}赢了！`
                if (result.info === 'ai') {
                    // eslint-disable-next-line no-unused-vars
                    msg += `Never make mistakes in a hurry.`
                    gameResult = 'lose-' + gameResult
                }
                else {
                    gameResult = 'win-' + gameResult
                }
            }

            //message.info(msg)
            message.show({ content: msg, type: 'info' })
            if (isAuth && mode !== '0') {//登录,非练习
                dispatch(userSlice.actions.refleshTic(gameResult))
            }
        }
    //}, [active, ai, dispatch, game, isAuth, isCurrent, mode])
    }, [active, ai, dispatch, game, isAuth, isCurrent, message, mode])

    //ai落子
    const aiDropPiece = useCallback(() => {
        const point = ai.output()
        if (point) {//当最后一个格子走完，point是undefined，忽略
            const [x, y] = point.split('').map(el => parseInt(el))
            dropPiece(x, y)
        }
    }, [ai, dropPiece])

    //实现ai落子
    useEffect(() => {
        if (game.isAiNext()) {
            aiDropPiece()
        }
    }, [aiDropPiece, game, step])//必须额外订阅step

    //重置棋盘
    const end = useCallback(() => {
        setStep(0)
        setWinCoordinates([])
        setActive(false)
    }, [])

    //登出后重置棋盘
    useEffect(() => {
        end()
    }, [end, userId])

    //对战
    const start = useCallback(() => {
        setStep(0)
        setWinCoordinates([])
        setGame(new Game(mode))
        setAi(new Ai(level))
        setActive(true)
    }, [level, mode])

    //历史快照
    const goToStep = useCallback((step) => {
        setStep(step)
        if (step === 0) {
            setWinCoordinates([])
            setGame(new Game(mode))
            setAi(new Ai(level))
        }
    }, [level, mode])

    return (
        <div className='myapp-tic'>
            <div className='myapp-tic-header'>
                ⚔️tic-tac-toe🛡️
            </div>

            <div className='myapp-tic-main'>
                <div className='myapp-tic-main-left'>
                    <LeftPanel mode={mode}
                        setMode={setMode}
                        level={level}
                        setLevel={setLevel}
                        end={end}
                        start={start}
                    />
                </div>

                <div className='myapp-tic-main-right'>
                    <GameBoard active={active}
                        snapshot={snapshot}
                        dropPiece={dropPiece}
                        currentStep={currentStep}
                        goToStep={goToStep}
                        winCoordinates={winCoordinates}
                    />
                </div>
            </div>
        </div>
    )
}