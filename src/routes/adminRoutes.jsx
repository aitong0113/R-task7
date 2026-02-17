//  路由表
import RequireAuth from '@/components/RequireAuth';
import AdminLayout from '@/layout/AdminLayout';
import AdminDashboard from '@/views/admin/AdminDashboard';
import AdminOrders from '@/views/admin/AdminOrders';
import AdminProducts from '@/views/admin/AdminProducts';
import Login from '@/views/admin/Login';

import ProtectedRoute from '../components/ProtectedRoute';


// 後台
const routes = [

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      { path: 'orders', 
        element: <AdminOrders /> 
      },
    ],
  },

]


export default routes;