//外層版型（Header + Outlet）
import { Link,Outlet } from 'react-router-dom';

import Header from '@/components/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container py-4">
      <Outlet />
      </main>
    </>
  );
}