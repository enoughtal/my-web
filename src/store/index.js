import { configureStore } from '@reduxjs/toolkit';
import { guestState } from '../../global.cjs';
import filesSlice from './files';
import noticeSlice from './notice';
import todosSlice from './todos';
import userSlice from './user';

function getStore(userState = guestState) {
  const store = configureStore({
    reducer: {
      todos: todosSlice.reducer,
      user: userSlice.reducer,
      files: filesSlice.reducer,
      notice: noticeSlice.reducer,
    },
    preloadedState: {
      user: userState,
    },
  });

  return store;
}

export default getStore;
