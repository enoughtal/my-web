import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { guestState as initialState } from '../../../global.cjs'
import noticeSlice from '../notice'
import fetch from './fetch'
import preferenceReducers from './preference.js'

/* 辅助函数，注册或登录 */
function registerOrLogin(act) {
    return async function (user, { dispatch, fulfillWithValue }) {
        const res = await act(user)
        const meta = {
            msg: res.msg,
            success: false
        }

        let payload
        if (res.user) {//成功
            payload = { ...initialState, ...res.user }
            meta.success = true
        }
        else {//失败
            payload = { ...initialState, preference: user.preference }
        }

        dispatch(noticeSlice.actions.notice(meta))
        return fulfillWithValue(payload, meta)
    }
}

/* 注册 */
export const register = createAsyncThunk(
    'user/server/register',
    registerOrLogin(fetch.register)
)

/* 登录 */
export const login = createAsyncThunk(
    'user/server/login',
    registerOrLogin(fetch.login)
)

/* 登出 */
export const logout = createAsyncThunk(
    'user/server/logout',
    async (arg, { getState, dispatch, fulfillWithValue }) => {
        const res = await fetch.logout()
        const meta = {
            msg: res.msg,
            success: false
        }

        let payload
        const currentState = getState().user
        if (res.code === '31') {//成功
            payload = {
                ...initialState,
                preference: currentState.preference
            }
            meta.success = true
        }
        else {//失败
            payload = currentState
        }

        dispatch(noticeSlice.actions.notice(meta))
        return fulfillWithValue(payload, meta)
    }
)

/* 从session获取用户 */
export const getUserFromSession = createAsyncThunk(
    'user/server/getUserFromSession',
    async () => {
        const user = await fetch.getUser()

        if (user.username) {//真实用户
            return { ...initialState, ...user }
        }
        else {//游客
            return initialState
        }
    }
)

/* userSlice */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        ...preferenceReducers,
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            return action.payload
        },
        [login.fulfilled]: (state, action) => {
            return action.payload
        },
        [logout.fulfilled]: (state, action) => {
            return action.payload
        },
        [getUserFromSession.fulfilled]: (state, action) => action.payload
    }
})

export default userSlice
export { savePreference, saveTic, selectNotLoseRate, selectPower, selectTitle } from './preference.js'
