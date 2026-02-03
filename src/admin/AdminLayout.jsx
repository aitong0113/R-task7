import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './adminLayout.scss';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ 清 token
    localStorage.removeItem('adminToken');

    // 導回登入頁
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="logo">InnerSound</h2>

        <nav className="menu">
          <NavLink to="/admin" end>
            後台首頁
          </NavLink>
          <NavLink to="/admin/products">
            商品管理
          </NavLink>
        </nav>



      <button className="logout-btn" onClick={handleLogout}>
        登出
      </button>
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