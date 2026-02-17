import { useState } from 'react';

import { useMessage } from '@/hooks/useMessage';
import { uploadImage } from '@/services/api';

export default function AdminProductModal({ open, product, onClose, onSave, loading = false }) {
  const { showMessage } = useMessage();
  const [form, setForm] = useState(() => ({
    // 基本欄位
    title: product?.title ?? '',
    category: product?.category ?? '',
    unit: product?.unit ?? '',
    origin_price: product?.origin_price ?? 0,
    price: product?.price ?? 0,
    description: product?.description ?? '',
    content: product?.content ?? '',
    // 狀態欄位
    is_enabled: product?.is_enabled ? 1 : 0,
    is_new: product?.is_new ? 1 : 0,
    // 圖片
    imageUrl: product?.imageUrl ?? '',
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: res.imageUrl }));
      showMessage('圖片上傳成功', 'success');
    } catch (err) {
      showMessage(err?.response?.data?.message || '圖片上傳失敗', 'error');
    }
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, imageUrl: '' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const toNum = (v) => Number(v) || 0;
    onSave({
      ...form,
      origin_price: toNum(form.origin_price),
      price: toNum(form.price),
      is_enabled: form.is_enabled ? 1 : 0,
      is_new: form.is_new ? 1 : 0,
    });
  };

  if (!open) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,.4)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h5 className="modal-title">{product ? '編輯商品' : '新增商品'}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row g-3">
                {/* 左欄：圖片與連結 */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">輸入圖片網址</label>
                    <input
                      name="imageUrl"
                      className="form-control"
                      placeholder="請輸入圖片連結"
                      value={form.imageUrl}
                      onChange={handleChange}
                    />
                    <div className="d-flex gap-2 mt-2">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setForm((p) => ({ ...p, imageUrl: p.imageUrl.trim() }))}>
                        新增圖片
                      </button>
                      <button type="button" className="btn btn-outline-danger" onClick={removeImage}>
                        移除圖片
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">產品圖片</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
                    {form.imageUrl ? <img src={form.imageUrl} alt="" className="img-fluid mt-2 rounded" /> : null}
                  </div>
                </div>

                {/* 右欄：文字欄位 */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">標題</label>
                    <input name="title" className="form-control" value={form.title} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">分類</label>
                    <input name="category" className="form-control" value={form.category} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">單位</label>
                    <input name="unit" className="form-control" value={form.unit} onChange={handleChange} />
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">原價</label>
                      <input name="origin_price" type="number" className="form-control" value={form.origin_price} onChange={handleChange} />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">售價</label>
                      <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-check mb-2">
                    <input id="enabled" name="is_enabled" type="checkbox" className="form-check-input" checked={!!form.is_enabled} onChange={handleChange} />
                    <label htmlFor="enabled" className="form-check-label">是否啟用</label>
                  </div>

                  <div className="form-check mb-3">
                    <input id="isnew" name="is_new" type="checkbox" className="form-check-input" checked={!!form.is_new} onChange={handleChange} />
                    <label htmlFor="isnew" className="form-check-label">是否為新品</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">產品描述</label>
                <textarea name="description" rows="2" className="form-control" value={form.description} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">說明內容</label>
                <textarea name="content" rows="3" className="form-control" value={form.content} onChange={handleChange} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={loading}>
                取消
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {product ? '儲存變更' : '新增商品'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}