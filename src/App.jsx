import { RouterProvider } from 'react-router-dom';

import MessageToast from '@/components/MessageToast';
import router from '@/routes'; // 這裡要匯出的是 router 物件

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <MessageToast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;