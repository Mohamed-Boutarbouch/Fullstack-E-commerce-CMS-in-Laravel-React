import { Outlet } from 'react-router-dom';

import Header from '@/components/NavigationBar';

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
