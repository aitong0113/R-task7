import frontRoutes from './frontRoutes';
import adminRoutes from './adminRoutes';

const routes = [
  ...adminRoutes,
  ...frontRoutes,
];

export default routes;