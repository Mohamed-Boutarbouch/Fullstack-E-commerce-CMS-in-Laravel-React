import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PageHeader from './PageHeader';

interface SettingsHeaderProps {
  setOpen: (agr: boolean) => void;
}

export default function SettingsHeader({ setOpen }: SettingsHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader title="Settings" description="Mange store preferences" />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
}
