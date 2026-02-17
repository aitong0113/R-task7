//thunks 只負責建立與延時移除，slice 只管資料

//定義一個 createAsyncMessage 的 thunk，用來顯示訊息並在指定時間後自動移除
//Thunk 是可被 dispatch 的函式，用來處理非同步與副作用（如 setTimeout、呼叫 API）；createAsyncThunk 會幫你產生這種函式
//要在觸發事件的頁面呼叫它，例如表單送出或操作成功時（Login.jsx、任一頁都可，也可在任何 API 成功/失敗的地方呼叫同一個 thunk，因為它會自動產生訊息物件並 dispatch createMessage + setTimeout removeMessage）
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createMessage, removeMessage } from './messageSlice';

// 顯示訊息並在 duration 後自動移除
export const createAsyncMessageThunk = createAsyncThunk(
  'message/createAsyncMessageThunk',
  async (payload = {}, thunkAPI) => {
    const { dispatch, requestId, signal } = thunkAPI;
    const { text, type, title, duration = 3000, timeout, success, message } = payload;

    const finalText = text ?? message ?? '';
    const finalType = type ?? (success === false ? 'error' : 'success');
    const finalTitle = title ?? (success === false ? '失敗' : '成功');

    dispatch(createMessage({ id: requestId, text: finalText, type: finalType, title: finalTitle }));

    const ms = typeof duration === 'number' ? duration : typeof timeout === 'number' ? timeout : 3000;
    let timer;
    if (ms > 0) timer = setTimeout(() => dispatch(removeMessage(requestId)), ms);

    signal.addEventListener('abort', () => {
      if (timer) clearTimeout(timer);
      dispatch(removeMessage(requestId));
    });

    return { id: requestId };
  }
);


// 老師用 thunkAPI.requestId 當訊息的 id，這裡目前用 uuidv4。(兩種都可)