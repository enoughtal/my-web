import { Form, Input, message, Select } from 'antd'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import todosSlice from '../../../store/todos'
import userSlice, { savePreference } from '../../../store/user'
import { themeClass } from '../../../tools/helper'
import { useDebounce } from '../../../tools/hooks'
import RandomTodo from '../../../tools/todos/RandomTodo.js'
import { DELAY_TIME, GUEST_ID } from '../../../tools/variables'
import '../index.sass'
const { Option } = Select

export default function TodosForm() {
    const userId = useSelector(state => state.user.userId)
    const theme = useSelector(state => state.user.preference.theme)
    const el = useSelector(state => state.user.preference.element)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const randomTodo = useMemo(() => new RandomTodo(), [userId])
    const [form] = Form.useForm()
    const dispatch = useDispatch()

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

    const rankSelect =
        <Select>
            <Option value={3}>{el}</Option>
            <Option value={2}>{el.repeat(2)}</Option>
            <Option value={1}>{el.repeat(3)}</Option>
        </Select>

    /* 点击TODO随机生成一条 */
    const generateRandomTodo = () => {
        const todo = randomTodo.generate()
        dispatch(todosSlice.actions.addOne(todo))
    }

    /* 提交表单 */
    const handleFinish = (inputs) => {
        const content = inputs.content?.replace(/\s+/g, ' ')//去除多余空格
        if (
            content === undefined
            || content === ''
            || content === ' '
            || content.length > 24
        ) {
            message.warning('内容长度不符合')
            return
        }
        inputs.content = encodeURIComponent(content)//sanitize input
        dispatch(todosSlice.actions.addOne(inputs))
        form.resetFields()
    }

    return (
        <div className='myapp-todos-form'>
            <div className='myapp-todos-form-element none-user-select'
                onClick={() => dispatch(userSlice.actions.changeElement())}
            >
                🪄
            </div>

            <div className='myapp-todos-form-text none-user-select'
                onClick={generateRandomTodo}
            >
                To D<span>🔮</span>
            </div>

            <Form layout='inline'
                colon={false}
                requiredMark={false}
                form={form}
                onFinish={handleFinish}
                className='myapp-todos-form-input'
            >

                <Form.Item label={<span className={themeClass(theme)}>要做的事</span>}
                    name='content'
                    className='myapp-todos-form-input-content'
                >
                    <Input placeholder='请输入要做的事（最多24个字）' autoFocus/>
                </Form.Item>

                <Form.Item label={<span className={themeClass(theme)}>优先级</span>}
                    name='rank'
                    initialValue={2}
                    className='myapp-todos-form-input-rank'
                >
                    {rankSelect}
                </Form.Item>

                <Form.Item>
                    <button type='submit'
                        className='myapp-todos-form-input-submit'
                    >
                        新建
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}