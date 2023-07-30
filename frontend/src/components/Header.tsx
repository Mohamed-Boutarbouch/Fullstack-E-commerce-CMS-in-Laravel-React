import ThemeToggleButton from '@/components/ThemeToggleButton';
import NavigationBar from '@/components/NavigationBar';
import StoreSwitcher from '@/components/StoreSwitcher';
import UserNav from '@/components/UserNav';
import { useAuth } from '@/hooks/auth';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'auth' });

  return (
    <header className="sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-3">
        <StoreSwitcher items={user.data?.stores} />
        <NavigationBar className="mx-6" />
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggleButton />
          <UserNav username={user.data?.name} email={user.data?.email} logout={logout} />
        </div>
      </div>
    </header>
  );
}
