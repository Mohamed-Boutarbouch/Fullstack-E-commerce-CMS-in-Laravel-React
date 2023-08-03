import { Link, Outlet, useLocation } from 'react-router-dom';
import { Plus, Trash } from 'lucide-react';

import PageHeader from '@/components/PageHeaders/PageHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shell } from '@/components/Shell';
import { getCurrentRouteNested } from '@/lib/utils';

export default function BillboardHeader() {
  const location = useLocation();
  const currentRoute = getCurrentRouteNested(location.pathname, 'billboards');

  const currentMessage = !currentRoute
    ? 'Mange billboard for your store'
    : currentRoute === 'new'
    ? 'Add new billboard'
    : 'Edit a billboard';

  const currentTitle = !currentRoute
    ? `Billboards (${0})`
    : currentRoute === 'new'
    ? 'Create billboard'
    : 'Edit billboard';

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <PageHeader title={currentTitle} description={currentMessage} />
        {!currentRoute ? (
          <Button asChild>
            <Link to="new" className="gap-1">
              <Plus className="w-4 h-4" />
              Add New
            </Link>
          </Button>
        ) : currentRoute === 'new' ? (
          ''
        ) : (
          <Button variant="destructive" size="icon" onClick={() => {}}>
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Outlet />
    </Shell>
  );
}
