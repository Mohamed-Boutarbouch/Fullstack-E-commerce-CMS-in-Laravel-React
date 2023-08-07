import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UpdateBillboardSchema, UpdateInputs } from '@/lib/validations/billboard';
import ImageUploadButton from '@/components/ImageUploadButton';
import { Trash } from 'lucide-react';
import { useBillboardApi } from '@/hooks/billboard-api';
import AlertModal from '@/components/models/AlertModal';

async function getFileFromUrl(url: string | undefined) {
  const res = await fetch(url!);
  const blob = await res.blob();
  return new File([blob], 'image', { type: blob.type });
}

export default function EditBillboard() {
  const { billboardQuery, deleteBillboard } = useBillboardApi();

  const [imagePreview, setImagePreview] = useState<string | null>(
    billboardQuery.data?.imgUrl || null,
  );
  const [open, setOpen] = useState(false);

  const billboardId = billboardQuery.data?.id;

  console.log(billboardQuery.data);

  const form = useForm<UpdateInputs>({
    resolver: zodResolver(UpdateBillboardSchema),
    defaultValues: async () => ({
      label: billboardQuery.data?.label,
      image: await getFileFromUrl(billboardQuery.data?.imgUrl),
    }),
  });

  // useEffect(() => {
  //   form.setValue('image', billboardQuery.data?.imgUrl);
  //   form.setValue('label', billboardQuery.data?.label!);
  // }, [form]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmitHandler = async (data: UpdateInputs) => {
    console.log(data);

    // update billboard
    // console.log({ id: billboard!.id, ...data, image: imageUrl });

    form.reset();

    setImagePreview(billboardQuery.data?.imgUrl || null);
  };

  function deletePreview() {
    setImagePreview(null);
    form.reset({ image: undefined });
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => billboardId && deleteBillboard.mutate({ billboardId })}
        loading={deleteBillboard.isLoading}
      />

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
                      className="w-64 h-64 object-cover rounded-md"
                    />
                    <Button
                      className="absolute top-2 left-2"
                      variant="destructive"
                      size="icon"
                      type="button"
                      onClick={deletePreview}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <FormControl>
                  <ImageUploadButton
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    disabled={billboardQuery.isLoading}
                    setImagePreview={setImagePreview}
                  />
                  {/* <Input
                  type="file"
                  accept="image/*"
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(event.target.files?.[0]);
                    setImagePreview(file ? URL.createObjectURL(file) : null);
                  }}
                /> */}
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
                  <Input disabled={billboardQuery.isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-fit" disabled={billboardQuery.isLoading}>
            Create
            <span className="sr-only">Create</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
