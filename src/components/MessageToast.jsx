//MessageToast 本身不負責產生訊息，只負責根據 Redux state 顯示畫面，具體的 Toast UI，讀取 Redux 的 messages，並在 2 秒後自動移除，避免重複顯示
import { useDispatch,useSelector } from 'react-redux';

import { removeMessage } from '@/slice/messageSlice';

export default function MessageToast() {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  if(!messages.length) return null;//沒有訊息就不渲染


  // 支援 slice 的 'danger'，並相容 'error'
  const variantClass = {
    success: 'text-white bg-success',
    danger: 'text-white bg-danger',
    error: 'text-white bg-danger',
    info: 'text-white bg-info',
    warning: 'text-dark bg-warning',
  };

   return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
      {messages.map(({ id, type = 'info', title, text }) => (
        <div
          key={id}
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header ${variantClass[type] ?? ''}`}>
            <strong className="me-auto">
              {title ?? (type === 'success' ? '成功' : (type === 'danger' || type === 'error') ? '失敗' : '訊息')}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"//btn-close 加上 data-bs-dismiss="toast"，讓 Bootstrap 也同步隱藏（即使 Redux 會移除）
              aria-label="Close"
              onClick={() => dispatch(removeMessage(id))}
            />
          </div>
          <div className="toast-body">{text}</div>
        </div>
      ))}
    </div>
  );
}
