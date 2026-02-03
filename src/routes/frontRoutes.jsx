//  路由表
import Layout from '../Layout';
import Home from '../front/Home';
import Products from '../front/Products';
import ProductDetail from '../front/ProductDetail';
import Cart from '../front/Cart';
import Checkout from '../front/Checkout';
import NotFound from '../front/NotFound';
import OrderSuccess from '../front/OrderSuccess';

  // 前台
const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'order-success/:id',
        element: <OrderSuccess />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;