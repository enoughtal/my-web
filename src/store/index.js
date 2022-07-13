import * as reduxToolkit from "@reduxjs/toolkit"
import filesSlice from "./files"
import noticeSlice from "./notice"
import todosSlice from './todos'
import userSlice from './user'

//https://github.com/reduxjs/redux-toolkit/issues/1960
const { configureStore } = reduxToolkit.default ?? reduxToolkit

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        user: userSlice.reducer,
        files: filesSlice.reducer,
        notice: noticeSlice.reducer
    }
})

export default store