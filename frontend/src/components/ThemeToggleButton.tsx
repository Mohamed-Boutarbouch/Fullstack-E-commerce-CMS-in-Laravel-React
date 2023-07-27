import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ThemeContext } from '@/hooks/theme';

export default function ThemeToggleButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9"
      aria-label="Switch theme"
      onClick={toggleTheme}
      {...props}
    >
      {theme === 'dark' ? (
        <Moon size={18} className="inline-block dark:hidden" />
      ) : (
        <Sun size={18} className="inline-block dark:hidden" />
      )}
    </Button>
  );
}
