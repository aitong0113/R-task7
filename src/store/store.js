//store.js 負責建立 Redux store，並將 slice 的 reducer 註冊到 store 中，讓整個應用都能存取和修改訊息狀態

import { configureStore } from '@reduxjs/toolkit';

import messageReducer from '@/slice/messageSlice';//匯入slice的reducer，會打import messageReducer不是import messageSlice，因為我們在messageSlice裡面export default messageSlice.reducer

export const store = configureStore({
  reducer: {
    message: messageReducer
  },
  devTools: import.meta.env.DEV, // 或改成 true
});

export default store;