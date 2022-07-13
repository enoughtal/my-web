import { Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { saveTodos, selectDirtyTodos } from '../../store/todos'
import { login, register } from '../../store/user'
import { themeClass } from '../../tools/helper'
import { useLock } from '../../tools/hooks'
import { GUEST_ID } from '../../tools/variables'
import './index.sass'

export default function Login() {
    const [isRegister, setIsRegister] = useState(false)
    const userId = useSelector(state => state.user.userId)
    const currentUsername = useSelector(state => state.user.username)
    const theme = useSelector(state => state.user.preference.theme)
    const preference = useSelector(state => state.user.preference)
    const dirtyTodos = useSelector(selectDirtyTodos)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [locked, lock] = useLock(1000)

    /* 登录之后保存一次todos，并且自动跳转到上一个页面 */
    useEffect(() => {
        if (userId !== GUEST_ID) {
            if (dirtyTodos) {
                const updateTodos = { ...dirtyTodos, userId }//使用登录后的userId替换
                dispatch(saveTodos(updateTodos))
            }

            const pathname = location.state?.from?.pathname
            if (pathname) {
                navigate(pathname)//自动跳转
            }
        }
    }, [dirtyTodos, dispatch, location.state?.from?.pathname, navigate, userId])

    /* 提交表单 */
    const handleFinish = (inputs) => {
        if (!locked) {
            lock()

            const { username, password, confirmPass } = inputs
            const user = { username, password, preference }

            if (username === currentUsername) {
                message.warning('此用户已登录')
            }
            else if (confirmPass) {//输入了确认密码就注册
                if (confirmPass === password) {
                    dispatch(register(user))
                }
                else {
                    message.warning('两次输入密码不一样')
                }
            }
            else {//没有确认密码就登录
                dispatch(login(user))
            }
        }
    }

    /* 成功之后重置表单 */
    useEffect(() => {
        form.resetFields()
    }, [form, userId])

    /* 观察confirmPass的值，让按钮在登录和注册之间切换 */
    const handleValuesChange = (val) => {
        if (val.confirmPass) {
            setIsRegister(true)
        }
        else {
            setIsRegister(false)
        }
    }

    return (
        <div className='myapp-login'>
            <Form labelCol={{ span: 3, offset: 7 }}
                wrapperCol={{ span: 3 }}
                colon={false}
                form={form}
                onFinish={handleFinish}
                onValuesChange={handleValuesChange}
            >
                <Form.Item wrapperCol={{ offset: 10 }}
                    colon={false}
                >
                    <h3 className={themeClass(theme)}>登录或注册</h3>
                </Form.Item>

                <Form.Item label={<span className={themeClass(theme)}>用户名</span>}
                    name='username'
                    rules={[
                        {
                            pattern: /^[A-Za-z0-9]{1,3}$/,
                            message: '不符合规则'
                        }
                    ]}
                >
                    <Input placeholder='1到3位字母或数字' autoFocus/>
                </Form.Item>

                <Form.Item label={<span className={themeClass(theme)}>密码</span>}
                    name='password'
                    rules={[
                        {
                            pattern: /^[A-Za-z0-9]{2,6}$/,
                            message: '不符合规则'
                        }
                    ]}
                >
                    <Input placeholder='2到6位字母或数字' />
                </Form.Item>

                <Form.Item label={<span className={themeClass(theme)}>确认密码</span>}
                    name='confirmPass'
                >
                    <Input placeholder='注册时输入' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10 }}
                    colon={false}
                >
                    <button type='submit'>
                        {isRegister ? '注册' : '登录'}
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}