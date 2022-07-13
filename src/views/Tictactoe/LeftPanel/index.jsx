import { useState } from 'react'
import { useSelector } from 'react-redux'
import { themeClass } from '../../../tools/helper'
import '../index.sass'

export default function LeftPanel({ mode, setMode, level, setLevel, end, start }) {
    const theme = useSelector(state => state.user.preference.theme)
    const [isPractice, setIsPractice] = useState(false)

    /* 提交mode */
    const inputMode = (e) => {
        end()
        setMode(e.target.value)

        if (e.target.value === '0') {
            setIsPractice(true)
        }
        else {
            setIsPractice(false)
        }
    }

    /* 提交level */
    const inputLevel = (e) => {
        end()
        setLevel(e.target.value)
    }

    const levelRadioClassName =
        'myapp-tic-main-left-radio'
        + (isPractice ? ' myapp-hidden' : '')

    return (
        <div className='myapp-tic-main-left'>
            <div className='myapp-tic-main-left-radio'>
                <span>
                    -游戏说明-
                </span>
                <div>
                    <span className='myapp-tic-main-left-radio-text'>
                        俗称&#39;井字棋&#39;<br />先手执⚔️,&nbsp;后手执🛡️<br />三子连成一线(直或斜)即获胜
                    </span>
                </div>
            </div>

            <div className='myapp-tic-main-left-radio'>
                <span>-选择棋子-</span>
                <div>
                    <label>
                        <input type='radio'
                            name='mode'
                            value='1'
                            checked={mode === '1'}
                            onChange={inputMode}
                        />
                        先手
                    </label>
                    <label>
                        <input type='radio'
                            name='mode'
                            value='2'
                            checked={mode === '2'}
                            onChange={inputMode}
                        />
                        后手
                    </label>
                    <label>
                        <input type='radio'
                            name='mode'
                            value='0'
                            checked={mode === '0'}
                            onChange={inputMode}
                        />
                        练习
                    </label>
                </div>
            </div>

            <div className={levelRadioClassName}>
                <span>-选择难度-</span>
                <div>
                    <label>
                        <input type='radio'
                            name='level'
                            value='easy'
                            checked={level === 'easy'}
                            onChange={inputLevel}
                        />
                        简单
                    </label>
                    <label>
                        <input type='radio'
                            name='level'
                            value='hard'
                            checked={level === 'hard'}
                            onChange={inputLevel}
                        />
                        困难
                    </label>
                </div>
            </div>

            <div className='myapp-tic-main-left-start'>
                <button type='button'
                    className={themeClass(theme)}
                    onClick={start}
                >
                    开始游戏
                </button>
            </div>
        </div>
    )
}