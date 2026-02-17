
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import MessageHost from '@/components/MessageHost';
import router from '@/routes/index.jsx';
import { store } from '@/store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      {/* 先渲染全域訊息 */}
      <MessageHost />
      {/* 再渲染路由 */}
      <RouterProvider router={router} />
    </Provider>
);
