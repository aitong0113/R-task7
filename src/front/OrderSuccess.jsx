import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

export default function OrderSuccess() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(id || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('複製失敗，請手動選取訂單編號');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="mb-3">訂單建立成功</h1>
      <p className="text-muted">感謝你的下單，我們已收到你的訂單資料。</p>

      <div className="p-4 border rounded-4 bg-light d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted" style={{ fontSize: 14 }}>訂單編號</div>
          <div className="fw-bold" style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>{id}</div>
        </div>
        <button className="btn btn-outline-primary" onClick={copyId}>
          {copied ? '已複製' : '複製編號'}
        </button>
      </div>

      <div className="d-flex gap-2 mt-4">
        <Link to="/" className="btn btn-primary">回首頁</Link>
        <Link to="/products" className="btn btn-outline-secondary">繼續逛逛</Link>
      </div>
    </div>
  );
}
