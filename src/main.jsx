//把寫好的「路由表」交給 React Router，然後掛到畫面上
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// 使用 BrowserRouter，並配合 Vite base 設定專案根徑
const router = createBrowserRouter(routes, {
  basename: '/R-task6', 
});


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)