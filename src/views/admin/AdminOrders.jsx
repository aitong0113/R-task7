import { useEffect, useState } from 'react';

import { httpAdmin } from '@/services/http';

const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 取得訂單列表
  const fetchOrders = () => {
    setLoading(true);
    httpAdmin.get(`/api/${API_PATH}/admin/orders`)
      .then(res => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchOrders();
    }, 0);
  }, []);
  // 檢視詳情
  const handleView = (order) => {
    alert(
      `訂單編號：${order.id}\n用戶：${order.user?.email}\n金額：${order.total}\n狀態：${order.is_paid ? '已付款' : '未付款'}`
    );
  };

  // 標記已付款
  const handlePaid = (order) => {
    if (order.is_paid) return;
    httpAdmin.put(`/api/${API_PATH}/admin/order/${order.id}`, {
      data: { is_paid: true }
    }).then(() => {
      alert('已標記為已付款');
      fetchOrders();
    });
  };

  // 刪除訂單
  const handleDelete = (order) => {
    if (!window.confirm('確定要刪除這筆訂單嗎？')) return;
    httpAdmin.delete(`/api/${API_PATH}/admin/order/${order.id}`)
      .then(() => {
        alert('訂單已刪除');
        fetchOrders();
      });
  };

  if (loading) {
    return <div className="text-center py-5">載入中...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3">訂單管理</h2>
      {orders.length === 0 ? (
        <p>目前沒有訂單。</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>用戶</th>
              <th>金額</th>
              <th>狀態</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.email || '-'}</td>
                <td>{order.total}</td>
                <td>{order.is_paid ? '已付款' : '未付款'}</td>
                <td>{new Date(order.create_at * 1000).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => handleView(order)}
                  >
                    檢視
                  </button>
                  <button
                    className="btn btn-sm btn-success me-1"
                    disabled={order.is_paid}
                    onClick={() => handlePaid(order)}
                  >
                    標記已付款
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(order)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}