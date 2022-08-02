import { createSlice } from '@reduxjs/toolkit'

const noticeSlice = createSlice({
    name: 'notice',
    initialState: {},
    reducers: {
        notice(state, action) {
            return action.payload
        }
    }
})

export default noticeSlice