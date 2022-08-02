import { message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import todosSlice from '../../../store/todos/index.js'
import userSlice, { savePreference } from '../../../store/user/index.js'
import { themeClass } from '../../../tools/helper/index.js'
import { useDebounce } from '../../../tools/hooks/index.js'
import RandomTodo from '../../../tools/todos/RandomTodo.js'
import { DELAY_TIME, GUEST_ID } from '../../../tools/variables/index.js'
import './index.sass'

export default function TodosForm() {
    const [content, setContent] = useState('')
    const [rank, setRank] = useState(2)

    const userId = useSelector(state => state.user.userId)
    const el = useSelector(state => state.user.preference.element)
    const theme = useSelector(state => state.user.preference.theme)

    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const randomTodo = useMemo(() => new RandomTodo(), [userId])

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleRankChange = (e) => {
        setRank(e.target.value)
    }

    /* element变更后n秒上传至服务器 */
    const debouncedEl = useDebounce(el, DELAY_TIME)
    useEffect(() => {
        if (userId !== GUEST_ID) {
            const data = {
                element: debouncedEl,
                userId
            }
            dispatch(savePreference(data))
        }
    }, [debouncedEl, dispatch, userId])

    /* 点击TODO随机生成一条 */
    const generateRandomTodo = () => {
        const todo = randomTodo.generate()
        dispatch(todosSlice.actions.addOne(todo))
    }

    /* 提交表单 */
    const handleSubmit = () => {
        const trimmedContent = content.replace(/\s+/g, ' ')//去除多余空格
        if (
            trimmedContent === ''
            || trimmedContent === ' '
            || trimmedContent.length > 24
        ) {
            message.warning('内容长度不符合')
            return
        }
        const todo = {
            content: encodeURIComponent(trimmedContent),//sanitize input
            rank
        }
        dispatch(todosSlice.actions.addOne(todo))
        setContent('')
        setRank(2)
    }

    return (
        <div className='myapp-comp-todosform'>
            <div className='myapp-comp-todosform-title'>
                <span className='myapp-comp-todosform-title-element none-user-select'
                    onClick={() => dispatch(userSlice.actions.changeElement())}
                >
                    👽
                </span>
                <span className='myapp-comp-todosform-title-text none-user-select'
                    onClick={generateRandomTodo}
                >
                    To D<span>🔮</span>
                </span>
            </div>

            <div className='myapp-comp-todosform-form'>
                <label className='myapp-comp-todosform-form-content'>
                    <span className='myapp-comp-todosform-form-content-label'>
                        要做的事
                    </span>
                    <input type='text'
                        className='myapp-comp-todosform-form-content-input'
                        placeholder='请输入要做的事'
                        maxLength={24}
                        value={content}
                        onChange={handleContentChange}
                    />
                </label>

                <label className='myapp-comp-todosform-form-rank'>
                    <span className='myapp-comp-todosform-form-rank-label'>
                        优先级
                    </span>
                    <select className='myapp-comp-todosform-form-rank-select'
                        value={rank}
                        onChange={handleRankChange}
                    >
                        <option value={3}
                            className={themeClass(theme, 'myapp-comp-todosform-form-rank-select-option')}
                        >
                            {el}
                        </option>

                        <option value={2}
                            className={themeClass(theme, 'myapp-comp-todosform-form-rank-select-option')}
                        >
                            {el.repeat(2)}
                        </option>

                        <option value={1}
                            className={themeClass(theme, 'myapp-comp-todosform-form-rank-select-option')}
                        >
                            {el.repeat(3)}
                        </option>
                    </select>
                </label>

                <button type='button'
                    className={themeClass(theme, 'myapp-comp-todosform-form-button')}
                    onClick={handleSubmit}
                >
                    新建
                </button>
            </div>
        </div>
    )
}