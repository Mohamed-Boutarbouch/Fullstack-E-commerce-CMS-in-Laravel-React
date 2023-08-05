import { Dispatch, SetStateAction } from 'react';
import { ImagePlus } from 'lucide-react';
import { Noop } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadButtonProps {
  setImagePreview: Dispatch<SetStateAction<string | null>>;
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  name: 'image';
  disabled: boolean;
}

export default function ImageUploadButton({
  onBlur,
  name,
  onChange,
  setImagePreview,
  disabled,
}: ImageUploadButtonProps) {
  return (
    <>
      <br />
      <Button asChild variant="secondary" className="cursor-pointer" disabled={disabled}>
        <label className="inline-block w-fit">
          <Input
            className="hidden"
            type="file"
            accept="image/*"
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onChange={(event) => {
              const file = event.target.files?.[0];
              onChange(event.target.files?.[0]);
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          <ImagePlus className="w-5 h-5 mr-2" />
          Upload an image
        </label>
      </Button>
    </>
  );
}
