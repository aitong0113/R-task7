//把寫好的「路由表」交給 React Router，然後掛到畫面上
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// 使用 HashRouter，避免 GitHub Pages 重整 404 問題
const router = createHashRouter(routes);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)