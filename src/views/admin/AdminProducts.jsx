import { useEffect, useState } from 'react';

import AdminProductModal from '@/components/AdminProductModal';
import useMessage from '@/hooks/useMessage';
// 加入全域訊息（用途：顯示成功/錯誤通知）
import { createAdminProduct, deleteAdminProduct, getAdminProducts, updateAdminProduct } from '@/services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // 分頁狀態（用途：控制目前頁碼與總頁數，供 API 與分頁 UI 使用）
  const [page, setPage] = useState(1);        // 目前頁碼（預設第 1 頁）
  const [totalPages, setTotalPages] = useState(1); // 後端回傳的總頁數

  const {showSuccess, showError } = useMessage(); // 加入全域訊息（用途：顯示成功/錯誤通知）

  // 新增：控制 Modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  // 新增：儲存中狀態（只影響 Modal）
  const [isSaving, setIsSaving] = useState(false);

  //新增：開啟、關閉、儲存
  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setOpen(true);
  };

  // 只在儲存中時阻擋關閉
  const closeModal = (force = false) => {
    if (isSaving && !force) return;
    setOpen(false);
    setEditing(null);
  };

  // 新增：台幣價格格式化
  const currency = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  });



  const handleSave = async (payload) => {
    try {
      setIsSaving(true);
      if (editing) {
        await updateAdminProduct(editing.id, payload);
        showSuccess('更新成功');
      } else {
        await createAdminProduct(payload);
        showSuccess('新增成功');
      }
      const res = await getAdminProducts(page);
      setProducts(res.products);
      setTotalPages(res.pagination?.total_pages || 1);
      closeModal(true);
    } catch (err) {
      // 調整為選項物件
      showError(err?.response?.data?.message || '儲存失敗');
    } finally {
      setIsSaving(false);
    }
  };

  // 只依賴 page，避免因 showError 變動重複抓資料
useEffect(() => {
  const fetch = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminProducts(page);
      setProducts(res.products);
      setTotalPages(res.pagination?.total_pages || 1);
    } catch (err) {
      showError(err?.response?.data?.message || '取得產品失敗');
    } finally {
      setIsLoading(false);
    }
  };
  fetch();
}, [page, showError]); 



  // 🔹 刪除商品
  const handleDelete = async (id) => {
    const ok = window.confirm('確定要刪除這個商品嗎？');
    if (!ok) return;

    try {
      await deleteAdminProduct(id);
      showSuccess('產品刪除成功');
      setIsLoading(true);
      const res = await getAdminProducts(page);
      setProducts(res.products);
      setTotalPages(res.pagination?.total_pages || 1);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || '刪除失敗';
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <p>載入中...</p>;
  }

  return (
    <div className="admin-products">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>商品管理</h2>
        {/* 新增商品按鈕 */}
        <button className="btn btn-primary" onClick={openCreate}>新增商品</button>
      </div>

      <table className="table align-middle">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th className="text-end">價格</th>
            <th className="text-center">狀態</th>
            <th className="text-center">是否為新品</th>
            <th className="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              {/* 使用 Intl.NumberFormat */}
              <td className="text-end">{currency.format(item.price)}</td>
              <td className="text-center">
                <span
                  className={`badge ${item.is_enabled ? 'bg-success' : 'bg-secondary'
                    }`}
                >
                  {item.is_enabled ? '啟用' : '未啟用'}
                </span>
              </td>
              <td className="text-center">
                <span>
                  {item.is_new ? <span className="badge bg-danger">新品</span> : <span className="text-muted">—</span>}
                </span>
              </td>
              <td className="text-center">
                {/* 新增「編輯」按鈕 */}
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openEdit(item)}>編輯</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal 僅渲染一次 */}
      {open && (
        <AdminProductModal
          key={editing?.id ?? 'new'}
          open={open}
          product={editing}
          onClose={closeModal}
          onSave={handleSave}
          loading={isSaving}
        />
      )}
      {/* 分頁 UI（用途：切換頁碼） */}
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >上一頁</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(p)}>{p}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>下一頁</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}