import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getAdminToken, removeAdminToken } from '@/services/auth';

import './adminLayout.scss';

export default function AdminLayout() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleLogout = () => {
    removeAdminToken();
    navigate('/login');
  };

  // 進入後台時進行權限驗證（無 token 或驗證失敗就導回登入）
  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/login');
      return;
    }
    axios
      .post(`${API_BASE}/api/user/check`, {}, { headers: { Authorization: token } })
      .catch(() => {
        removeAdminToken();
        navigate('/login');
      });
  }, [navigate, API_BASE]);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="logo">InnerSound</h2>
        <nav className="menu">
          <NavLink to="/admin" end>後台首頁</NavLink>
          <NavLink to="/admin/products">商品管理</NavLink>
          <NavLink to="/admin/orders">訂單管理</NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>登出</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>後台管理系統</h1>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}