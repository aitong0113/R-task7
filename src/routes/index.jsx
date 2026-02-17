import { createHashRouter } from 'react-router-dom';

import adminRoutes from './adminRoutes';
import frontRoutes from './frontRoutes';

// 先組合所有 route 設定
export const routes = [
  ...frontRoutes,
  ...adminRoutes,
];

// 用 Hash 路由（你的網址有 #），並加上專案前綴
const router = createHashRouter(routes);

export default router;