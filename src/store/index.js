import { configureStore } from "@reduxjs/toolkit"
import filesSlice from "./files/index.js"
import noticeSlice from "./notice/index.js"
import todosSlice from './todos/index.js'
import userSlice from './user/index.js'

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        user: userSlice.reducer,
        files: filesSlice.reducer,
        notice: noticeSlice.reducer
    }
})

export default store