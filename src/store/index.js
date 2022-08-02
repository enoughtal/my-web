import { configureStore } from "@reduxjs/toolkit"
import filesSlice from "./files"
import noticeSlice from "./notice"
import todosSlice from './todos'
import userSlice from './user'

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        user: userSlice.reducer,
        files: filesSlice.reducer,
        notice: noticeSlice.reducer
    }
})

export default store