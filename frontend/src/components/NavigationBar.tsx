import LogoutButton from '@/components/LogOutButton';
import ThemeMenuButton from '@/components/ThemeMenuButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-3">
        <h2 className="text-lg font-medium">Scribble</h2>

        <div className="flex items-center gap-3 md:gap-4">
          <LogoutButton />

          <ThemeMenuButton />
        </div>
      </div>
    </header>
  );
}
