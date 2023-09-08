import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import { logout } from '../user/index.js';
import fetch from './fetch.js';
/*
    从服务器获取todos
*/
export const loadTodos = createAsyncThunk(
  'todos/server/loadTodos',
  async (query) => {
    const result = await fetch.readTodos(query);
    return result;
  }
);

/*
    保存至服务器
*/
export const saveTodos = createAsyncThunk(
  'todos/server/saveTodos',
  async (data) => {
    let { entities, ids } = data;
    ids = ids
      .map((id) => entities[id])
      .filter((todo) => !todo.fake) //剔除fake
      .map((todo) => todo.id);

    const LIMIT = 30; //一次最大上传数
    let i = 0;
    while (i * LIMIT < ids.length) {
      const partIds = ids.slice(i * LIMIT, i * LIMIT + LIMIT);
      const res = await fetch.upsertTodos({ ...data, ids: partIds });
      if (!res.done) break;
      i++;
    }

    if (i * LIMIT >= ids.length) {
      return { done: true };
    }
    return { done: false };
  }
);

/* prepare，给每个todo添加id */
function generateTodo(inputs) {
  const createdTime = Date.now() + 8 * 3600 * 1000;
  const completed = false;
  const id = nanoid(8);
  const todo = {
    ...inputs,
    createdTime,
    completed,
    id,
  };
  return todo;
}

/* reducers */
const reducers = {
  addOne: {
    reducer: (state, action) => {
      const todo = action.payload;
      if (todo.content) {
        state.entities[todo.id] = todo;
        state.ids.unshift(todo.id);
        if (!todo.fake) {
          state.isDirty = true;
        }
      }
    },
    prepare: (inputs) => ({ payload: generateTodo(inputs) }),
  },
  changeRank: (state, action) => {
    const todo = state.entities[action.payload];
    state.entities[action.payload].rank = todo.rank - 1 ? todo.rank - 1 : 3;
    if (!todo.fake) {
      state.isDirty = true;
    }
  },
  complete: (state, action) => {
    state.entities[action.payload].completed = true;
    if (!state.entities[action.payload].fake) {
      state.isDirty = true;
    }
  },
  clean: (state) => {
    state.isDirty = false;
  },
};

/* 辅助函数，把数据的格式变为{ entities, ids }的形式 */
function transformData(data) {
  const entities = {};
  const ids = [];
  data.forEach((item) => {
    entities[item.id] = item;
    ids.push(item.id);
  });
  return {
    entities,
    ids,
    isDirty: false,
  };
}

/* state初始值 */
const initialState = {
  entities: {},
  ids: [],
  isDirty: false,
};

/* todosSlice */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers,
  extraReducers: {
    [loadTodos.fulfilled]: (state, action) => transformData(action.payload),
    [saveTodos.fulfilled]: (state, action) => {
      if (action.payload.done) {
        //保存完重置isDirty
        state.isDirty = false;
      }
    },
    [logout.fulfilled]: () => initialState, //登出后将todos重置
  },
});

/* selector */
const selectDirtyTodos = createSelector(
  (state) => state.todos,
  (state) => state.user.userId,
  ({ entities, ids, isDirty }, userId) =>
    isDirty
      ? {
          entities,
          ids,
          userId,
        }
      : null
);

/* selector */
const selectShowedTodos = createSelector(
  (state) => state.todos,
  ({ entities, ids }) =>
    ids
      .map((id) => entities[id])
      .filter((todo) => !todo.completed)
      .map((todo) => ({
        ...todo,
        content: decodeURIComponent(todo.content),
        createdTime: new Date(todo.createdTime)
          .toISOString()
          .slice(5, -5)
          .replace('T', ' '),
      }))
);

export default todosSlice;
export { selectDirtyTodos, selectShowedTodos };
