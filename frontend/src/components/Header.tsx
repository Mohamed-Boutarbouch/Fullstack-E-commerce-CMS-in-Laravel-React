import ThemeToggleButton from '@/components/ThemeToggleButton';
import NavigationBar from '@/components/NavigationBar';
import StoreSwitcher from '@/components/StoreSwitcher';
import UserAvatar from '@/components/UserAvatar';
import { useAuth } from '@/hooks/auth';
import useStoreApi from '@/hooks/store-api';

export default function Header() {
  const { user, logout } = useAuth();
  const { storesQuery } = useStoreApi();

  return (
    <header className="sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-3">
        <StoreSwitcher items={storesQuery.data} />
        <NavigationBar className="mx-6" />
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggleButton />
          <UserAvatar username={user.data?.name} email={user.data?.email} logout={logout} />
        </div>
      </div>
    </header>
  );
}
