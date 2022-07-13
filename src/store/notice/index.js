import * as reduxToolkit from '@reduxjs/toolkit'
const { createSlice } = reduxToolkit.default ?? reduxToolkit

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