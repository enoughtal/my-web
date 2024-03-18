import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetch from './fetch';

/* 获取文章内容 */
export const getFile = createAsyncThunk(
  'files/server/getFile',
  async (data) => {
    const res = await fetch.getFile(data);
    if (!res) return {};

    const { text, createdAt } = res;
    const index = text.indexOf('\n');
    const title = text.slice(0, index);
    const content = text.slice(index);
    return {
      title,
      createdAt,
      content,
    };
  }
);

/* 获取文章列表 */
export const getCategory = createAsyncThunk(
  'files/server/getCategory',
  async (arg, { getState, dispatch }) => {
    const category = await fetch.getCategory();
    if (!category) return {};

    if (!getState().files.selectedFile) {
      const subjects = Object.keys(category);
      const randomSubject =
        subjects[Math.floor(Math.random() * subjects.length)]; //初始渲染的时候随机选择一篇文章
      const files = category[randomSubject];
      const randomFile = files[Math.floor(Math.random() * files.length)];

      const data = {
        subject: randomSubject,
        filename: randomFile + '.md',
      };
      dispatch(getFile(data));

      return {
        category,
        selectedFile: randomFile,
        selectedSubjects: [randomSubject],
      };
    }

    return {
      category,
    };
  }
);

const initialState = {
  article: {},
  category: {},
  selectedFile: '',
  selectedSubjects: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const { selectedSubjects, category } = state;
      const file = action.payload;

      state.selectedFile = file;
      state.selectedSubjects = selectedSubjects.filter((subject) =>
        category[subject].includes(file)
      );
    },
    selectSubject: (state, action) => {
      const { selectedSubjects, selectedFile, category } = state;
      const subject = action.payload;

      if (!selectedSubjects.includes(subject)) {
        selectedSubjects.push(subject); //添加元素
      } else if (!category[subject].includes(selectedFile)) {
        selectedSubjects.splice(selectedSubjects.indexOf(subject), 1); //删除元素
      }
    },
  },
  extraReducers: {
    [getFile.fulfilled]: (state, action) => {
      state.article = action.payload;
    },
    [getCategory.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default filesSlice;
