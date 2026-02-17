/*MessageHost.jsx 是「全域通知訊息的容器」
監聽 Redux 的 message slice（useSelector 取得 messages）。
把每一筆訊息渲染成 Bootstrap Toast，固定在右上角，z-index 提高。
提供叉叉按鈕，點擊時 dispatch(removeMessage(id)) 把該訊息移除。
不負責產生訊息或自動消失；產生/自動移除由 useMessage hook 完成（dispatch(createMessage)＋setTimeout(removeMessage))。*/

import { useDispatch,useSelector } from 'react-redux';

import { removeMessage } from '@/slice/messageSlice';

export default function MessageHost() {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const headerClass = (type) => (type === 'success' ? 'bg-success text-white' : 'bg-danger text-white');
  const titleText = (type) => (type === 'success' ? '成功' : '失敗');

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080, pointerEvents: 'none' }}>
      {messages.map((m) => (
        <div key={m.id} className="toast show border-0 shadow mb-2" role="alert" style={{ pointerEvents: 'auto' }}>
          <div className={`toast-header ${headerClass(m.type)}`}>
            <strong className="me-auto">{titleText(m.type)}</strong>
            <button
              type="button"
              className="btn-close btn-close-white ms-2 mb-1"
              aria-label="Close"
              onClick={() => dispatch(removeMessage(m.id))}
            />
          </div>
          <div className="toast-body">{m.text}</div>
        </div>
      ))}
    </div>
  );
}