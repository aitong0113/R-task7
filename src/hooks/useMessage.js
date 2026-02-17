import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createAsyncMessage } from '@/slice/messageSlice'; // 內部使用，元件不要直接呼叫
/**
 為什麼要有 useMessage？
- 元件不該知道 Redux
- 元件只需要表達「我要顯示成功 / 失敗」

 * - text：訊息文字
 * - type：success | error | info（預設 success）
 * - timeout：顯示毫秒數（預設 3000）
 * 
 * 

Component (MessageToast 只負責顯示)
   ↓
useMessage（語意封裝）
   ↓
createAsyncMessage（Redux 行為）
   ↓
messageSlice（狀態實作）


與助教差異：
1.多一層 showMessage
  a.單一入口：所有訊息邏輯集中，避免在各處重複寫 success/error。
  b.易擴充：未來要加 info、warning、預設 timeout、追蹤/log，都只改這一點。
  c.對 slice 解耦：hook 內可自由把 {text, type, timeout} 轉成 slice 要的形狀，不影響元件程式碼。

2.Payload { text, type, timeout }
  a.UI 友善：用 type 表達語意更直覺，timeout 讓顯示時間可配置。
  b.可轉換：若 slice 要 { success, message }，在 hook 內轉換即可，維持元件呼叫一致。

3.useCallback 穩定參考
  a.防不必要 re-render：把函式當 props 傳下去或放在依賴陣列時不會每次重建。
  b.安全用於 useEffect 依賴：避免因函式位址改變導致無限觸發。

4.同時提供 default 與 named export
  a.匯入彈性與相容：舊程式可用 default，新程式可偏好 named；遷移期間較平滑。
  b.建議最終選一種，避免團隊混用造成風格不一致。

 */
function normalize(input){
  if (typeof input === 'string') return { text: input };
  if(input?.response?.data) return input.response.data;// axios 錯誤物件
  if(typeof input === 'object' && input) return input;
  return { text: String(input ?? '' ) };
}


function useMessage() {
  const dispatch = useDispatch();

  // 用 useCallback 穩定參考，便於放進 useEffect 依賴
  // showMessage 是一個可被元件呼叫的函式，用來顯示訊息，內部會 dispatch createAsyncMessage 來處理訊息的產生與自動移除
  const showMessage = useCallback((payload, overrides = {}) => {
    const base = normalize(payload);
    return dispatch(createAsyncMessage({ ...base, ...overrides }));
  }, [dispatch]);

  // 進一步封裝 showSuccess 和 showError，讓元件更語意化地呼叫
  const showSuccess = useCallback((msg, options) => {
    return showMessage(msg, { type: 'success', title: '成功', ...options });
  }, [showMessage]);

  const showError  = useCallback((errOrMsg, options) => {
    return showMessage(errOrMsg, { type: 'error', title: '失敗', success: false, ...options });
  }, [showMessage]);


   const showInfo = useCallback((msg, options) => {
    return showMessage(msg, { type: 'info', title: '提示', ...options });
  }, [showMessage]);


  //語意函式，讓元件呼叫時更直觀，避免元件直接操作 type 字串，減少錯誤機會；同時提供 showMessage 讓需要自訂 type 的元件也能使用
  return { showMessage, showSuccess, showError, showInfo };

}


export { useMessage };
export default useMessage;
