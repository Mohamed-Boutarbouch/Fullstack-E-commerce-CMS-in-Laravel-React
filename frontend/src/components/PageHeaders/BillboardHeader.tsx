import { Link, Outlet } from 'react-router-dom';
import { Plus } from 'lucide-react';

import PageHeader from '@/components/PageHeaders/PageHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shell } from '@/components/Shell';

export default function BillboardHeader() {
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <PageHeader title={`Billboards (${0})`} description="Mange billboard for your store" />
        <Button asChild>
          <Link to="new" className="gap-1">
            <Plus className="w-4 h-4" />
            Add New
          </Link>
        </Button>
      </div>
      <Separator />
      <Outlet />
    </Shell>
  );
}
