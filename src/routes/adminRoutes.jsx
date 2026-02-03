//  路由表
import Login from '../admin/Login';
import AdminDashboard from '../admin/AdminDashboard';
import AdminLayout from '../admin/AdminLayout';
import AdminProducts from '../admin/AdminProducts';


// 後台
const routes = [

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,           
        element: <AdminDashboard /> 
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
    ],
  },

]


export default routes;