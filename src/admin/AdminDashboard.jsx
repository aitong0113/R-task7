// src/admin/AdminDashboard.jsx
import './adminDashboard.scss';

export default function AdminDashboard() {
  return (
    <section className="dashboard">
      <h2 className="dashboard-title">系統概覽</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p className="card-label">商品數量</p>
          <p className="card-value">12</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">待處理訂單</p>
          <p className="card-value">3</p>
        </div>

        <div className="dashboard-card">
          <p className="card-label">系統狀態</p>
          <p className="card-value status-ok">正常運行</p>
        </div>
      </div>

      <div className="dashboard-hint">
        <h3>快速操作</h3>
        <p>請由左側選單進入「商品管理」進行編輯。</p>
      </div>
    </section>
  );
}