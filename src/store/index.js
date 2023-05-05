import { configureStore } from "@reduxjs/toolkit"
import { GUEST_ID } from "../tools/variables"
import filesSlice from "./files"
import noticeSlice from "./notice"
import todosSlice from './todos'
import userSlice from './user'

const guestState = {
    userId: GUEST_ID,
    username: '访客',
    preference: {
        theme: 'light',
        element: '🔥'
    },
    tic: {
        totalScore: 0,
        lose: 0,
        count: 0
    },
}

function getStore(userState = guestState) {
    const store = configureStore({
        reducer: {
            todos: todosSlice.reducer,
            user: userSlice.reducer,
            files: filesSlice.reducer,
            notice: noticeSlice.reducer
        },
        preloadedState: {
            user: userState
        }
    })

    return store
}

export default getStore