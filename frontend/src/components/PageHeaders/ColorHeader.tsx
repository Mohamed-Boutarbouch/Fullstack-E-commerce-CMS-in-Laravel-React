import { Link, Outlet, useLocation } from 'react-router-dom';
import { Plus, Trash } from 'lucide-react';

import PageHeader from '@/components/PageHeaders/PageHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shell } from '@/components/Shell';
import { getCurrentRouteNested } from '@/lib/utils';

export default function ColorHeader() {
  const location = useLocation();
  const currentRoute = getCurrentRouteNested(location.pathname, 'colors');

  const currentMessage = !currentRoute
    ? 'Mange colors for your store'
    : currentRoute === 'new'
    ? 'Add new color'
    : 'Edit a color';

  const currentTitle = !currentRoute
    ? `Colors (${0})`
    : currentRoute === 'new'
    ? 'Create color'
    : 'Edit color';

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
