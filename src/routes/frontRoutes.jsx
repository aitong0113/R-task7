//  路由表
// Layout
import FrontendLayout from "@/layout/FrontendLayout";
import Cart from "@/views/front/Cart";
import Checkout from "@/views/front/Checkout";
// pages
import Home from "@/views/front/Home";
import NotFound from "@/views/front/NotFound";
import OrderSuccess from "@/views/front/OrderSuccess";
import ProductDetail from "@/views/front/ProductDetail";
import Products from "@/views/front/Products";

  // 前台
const routes = [
  {
    path: '/',
    element: <FrontendLayout />,
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