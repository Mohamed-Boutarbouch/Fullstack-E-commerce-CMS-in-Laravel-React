import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreateBillboardSchema, CreateInputs } from '@/lib/validations/billboard';
import ImageUploadButton from '@/components/ImageUploadButton';
import { Trash } from 'lucide-react';
import { useBillboardApi } from '@/hooks/billboard-api';
import { cn } from '@/lib/utils';

export default function NewBillboard() {
  const { createBillboard } = useBillboardApi();
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CreateInputs>({
    resolver: zodResolver(CreateBillboardSchema),
    defaultValues: { label: '', image: undefined },
  });

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function deletePreview() {
    setImagePreview(null);
    form.reset({ image: undefined });
  }

  async function onSubmitHandler(data: CreateInputs) {
    await createBillboard.mutateAsync({ ...data, storeId });
    form.reset();
    setImagePreview(null);
    navigate('../');
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 max-w-lg"
        onSubmit={(...args) => void form.handleSubmit(onSubmitHandler)(...args)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field: { name, onBlur, onChange } }) => (
            <FormItem>
              <FormLabel>Background Image</FormLabel>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className={cn(
                      'w-64 h-64 object-cover rounded-md',
                      createBillboard.isLoading ? 'mix-blend-luminosity' : '',
                    )}
                  />
                  <Button
                    className="absolute top-2 left-2"
                    variant="destructive"
                    size="icon"
                    type="button"
                    disabled={createBillboard.isLoading}
                    onClick={deletePreview}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <FormControl>
                {/*TODO: ImageUploadButton not working after touching the label field first or after cancelling image upload modal*/}
                <ImageUploadButton
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  disabled={createBillboard.isLoading}
                  setImagePreview={setImagePreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input disabled={createBillboard.isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-fit" disabled={createBillboard.isLoading}>
          Create
          <span className="sr-only">Create</span>
        </Button>
      </form>
    </Form>
  );
}
