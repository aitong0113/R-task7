import { useEffect, useState } from 'react';

import { httpAdmin } from '@/services/http';

const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [status, setStatus] = useState('載入中...');

  useEffect(() => {
    // 取得商品數量
    httpAdmin.get(`/api/${API_PATH}/admin/products/all`)
      .then(res => {
        setProductCount(Object.keys(res.data.products).length);
      })
      .catch(() => setProductCount(0));

    // 取得訂單數量
    httpAdmin.get(`/api/${API_PATH}/admin/orders`)
      .then(res => {
        const orders = res.data.orders || [];
        // 假設「未付款」為待處理訂單
        const pending = orders.filter(order => !order.is_paid).length;
        setPendingOrderCount(pending);
      })
      .catch(() => setPendingOrderCount(0));

    // 系統狀態（這裡簡單寫死為正常運行，可根據需求調整）
    setStatus('正常運行');
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">系統概覽</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card p-4">
            <div>商品數量</div>
            <div className="fs-2 fw-bold">{productCount}</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-4">
            <div>待處理訂單</div>
            <div className="fs-2 fw-bold">{pendingOrderCount}</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-4">
            <div>系統狀態</div>
            <div className="fs-2 fw-bold text-success">{status}</div>
          </div>
        </div>
      </div>
      <div>
        <h5>快速操作</h5>
        <div className="border-start border-primary ps-3">
          請由左側選單進入「商品管理」進行編輯。
        </div>
      </div>
    </div>
  );
}