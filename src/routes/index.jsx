//  路由表
import Layout from '../Layout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        path: '/', 
        element: <Home /> 
      },
      { 
        path: '/products', 
        element: <Products /> 
      },
      { 
        path: '/products/:id', 
        element: <ProductDetail /> 
      },
      { 
        path: '/cart', 
        element: <Cart /> 
      },
      { 
        path: '/checkout', 
        element: <Checkout /> 
      },
    ],
  },
];

export default routes;