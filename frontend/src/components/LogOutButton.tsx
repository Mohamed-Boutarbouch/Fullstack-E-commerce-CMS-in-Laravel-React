import { LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';
import { Icons } from '@/components/ui/icons';

export default function LogOutButton() {
  const { logout } = useAuth({ middleware: 'auth' });

  return (
    <Button variant="outline" size="sm" onClick={() => logout.mutate()} disabled={logout.isLoading}>
      {logout.isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <LogOutIcon size={18} className="mr-2" />
      )}
      Log-out
    </Button>
  );
}
