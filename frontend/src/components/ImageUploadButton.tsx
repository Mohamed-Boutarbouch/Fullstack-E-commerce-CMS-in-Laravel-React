import { ImagePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ImageUploadButton({ field }: any) {
  return (
    <Button asChild variant="secondary" className="cursor-pointer">
      <label className="inline-block w-fit">
        <Input type="file" accept="image/*" className="hidden" {...field} />
        <ImagePlus className="w-5 h-5 mr-2" />
        Upload an image
      </label>
    </Button>
  );
}
