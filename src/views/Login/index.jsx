import { useMessage } from '@cdztt/message-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GUEST_ID } from '../../../global.cjs';
import { saveTodos, selectDirtyTodos } from '../../store/todos';
import { login, register } from '../../store/user';
import { themeClass } from '../../tools/helper';
import { useLock } from '../../tools/hooks';
import './index.sass';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const userId = useSelector((state) => state.user.userId);
  const currentUsername = useSelector((state) => state.user.username);
  const preference = useSelector((state) => state.user.preference);
  const theme = useSelector((state) => state.user.preference.theme);
  const dirtyTodos = useSelector(selectDirtyTodos);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [locked, lock] = useLock(1000);

  const message = useMessage();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    usernameRef.current.checkValidity();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    passwordRef.current.checkValidity();
  };

  /* 登录之后保存一次todos，并且自动跳转到上一个页面 */
  useEffect(() => {
    if (userId !== GUEST_ID) {
      if (dirtyTodos) {
        const updateTodos = { ...dirtyTodos, userId }; //使用登录后的userId替换
        dispatch(saveTodos(updateTodos));
      }

      const pathname = location.state?.from?.pathname;
      if (pathname) {
        navigate(pathname); //自动跳转
      }
    }
  }, [dirtyTodos, dispatch, location.state?.from?.pathname, navigate, userId]);

  /* 提交表单 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locked) {
      lock();
      const user = { username, password, preference };

      if (username === currentUsername) {
        message.show({ content: '此用户已登录', type: 'warning' });
      } else if (confirmPass) {
        //输入了确认密码就注册
        if (confirmPass === password) {
          dispatch(register(user));
        } else {
          message.show({ content: '两次输入密码不一样', type: 'warning' });
        }
      } else {
        //没有确认密码就登录
        dispatch(login(user));
      }
    }
  };

  /* 成功之后重置表单 */
  useEffect(() => {
    setUsername('');
    setPassword('');
    setConfirmPass('');
  }, [userId]);

  /* 观察confirmPass的值，让按钮在登录和注册之间切换 */
  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value);

    if (e.target.value !== '') {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  };

  return (
    <div className="myapp-login">
      <div className="myapp-login-header">登录或注册</div>

      <form className="myapp-login-form">
        <div className="myapp-login-form-item">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            className="myapp-login-form-item-input"
            placeholder="1到3位字母或数字"
            maxLength={3}
            name="username"
            value={username}
            onChange={handleUsernameChange}
            pattern="^[A-Za-z0-9]{1,3}$"
            ref={usernameRef}
          />
        </div>

        <div className="myapp-login-form-item">
          <label htmlFor="password">密码</label>
          <input
            type="text"
            id="password"
            className="myapp-login-form-item-input"
            placeholder="2到6位字母或数字"
            maxLength={6}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            pattern="^[A-Za-z0-9]{2,6}$"
            ref={passwordRef}
          />
        </div>

        <div className="myapp-login-form-item">
          <label htmlFor="confirmPass">确认密码</label>
          <input
            type="text"
            id="confirmPass"
            className="myapp-login-form-item-input myapp-login-form-item-input-confirm"
            placeholder="只在注册时输入"
            maxLength={6}
            name="confirmPass"
            value={confirmPass}
            onChange={handleConfirmPassChange}
            ref={confirmPassRef}
          />
        </div>

        <div className="myapp-login-form-submit">
          <button
            type="button"
            onClick={handleSubmit}
            className={themeClass(theme)}
          >
            {isRegister ? '注 册' : '登 录'}
          </button>
        </div>
      </form>
    </div>
  );
}
