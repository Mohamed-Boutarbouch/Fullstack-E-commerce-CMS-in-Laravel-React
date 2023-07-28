import LogoutButton from '@/components/LogOutButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import StoreSwitcher from '@/components/StoreSwitcher';
import { useAuth } from '@/hooks/auth';

export default function NavigationBar() {
  const { user } = useAuth({ middleware: 'auth' });

  return (
    <header className="sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm">
      <nav className="container flex items-center justify-between py-3">
        <StoreSwitcher items={user.data?.stores} />

        <div className="flex items-center gap-3 md:gap-4">
          <LogoutButton />

          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
