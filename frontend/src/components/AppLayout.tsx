import { Outlet } from 'react-router-dom';

import NavigationBar from '@/components/NavigationBar';

export default function AppLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
