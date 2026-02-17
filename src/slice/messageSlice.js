//slice管資料，定義 state 長什麼樣子 + 定義可以怎麼修改 state
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const messageSlice = createSlice({
  /*老師版：訊息物件有固定欄位 {id, type, title, text}，且 type/title 由 payload.success 推導；id 由外部提供。邏輯集中在 slice，呼叫時要傳 { id, success, message }。*/
  name: 'message',
  initialState: [], //預計是個陣列，裡面放訊息物件 { id, text, type }
  reducers: {
    createMessage: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(payload) {
        const { id, ...rest } = payload || {};
        //prepare 讓 reducer 保持純函式，DevTools 可穩定回放；uuidv4 很適合前端暫時訊息生成，且不會重複
        return {
          payload: {
            id: id ?? uuidv4(),//純 UI 訊息（toast/alert）用 uuidv4 自動產生 id較簡潔
            ...rest,
          },
        };
      },
    },
    //removeMessage 要 return 新陣列
    removeMessage(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    //清除全部訊息
    clearMessages() {
      return [];
    },
  },
});


//在 slice 加一個 thunk，負責加入訊息並在指定時間後自動移除
// 支援 API 形狀({ success, message })與自訂形狀({ text, type, title, duration/timeout })
export const createAsyncMessage = (payload = {}) => (dispatch) => {
  const { text, type, title, duration, timeout, success, message } = payload;

  const id = uuidv4();
  const finalText = text ?? message ?? '';
  const finalType = type ?? (success === false ? 'error' : 'success');
  const finalTitle = title ?? (success === false ? '失敗' : '成功');

  dispatch(createMessage({ id, type: finalType, title: finalTitle, text: finalText }));

  const ms = typeof duration === 'number' ? duration
           : typeof timeout === 'number' ? timeout
           : 3000;
  if (ms > 0) setTimeout(() => dispatch(removeMessage(id)), ms);

  return { id };
};


//匯出 createSlice 產生的 action 函式供元件 dispatch 使用，以及 reducer 給 store 使用
export const { createMessage, removeMessage, clearMessages } = messageSlice.actions;

//匯出 reducer 給 store 註冊管理 state用，元件不直接使用 reducer，元件只呼叫 action（dispatch(createMessage)）來修改 state，reducer 負責定義修改邏輯
export default messageSlice.reducer;
