import { Outlet } from 'react-router-dom';

import Header from '@/components/NavigationBar';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
