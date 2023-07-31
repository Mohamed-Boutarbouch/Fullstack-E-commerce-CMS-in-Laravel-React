import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import PageHeading from '@/components/PageHeading';
import AlertModal from '@/components/AlertModal';
import ApiAlert from '@/components/ApiAlert';
import { StoreNameSchema } from '@/lib/validations/store';
import { deleteStoreApi, updateStoreApi } from '@/services/storeServices';
import { useReadLocalStorage } from 'usehooks-ts';
import { toast } from 'react-hot-toast';

type Inputs = z.infer<typeof StoreNameSchema>;

const origin: string = import.meta.env.VITE_LARAVEL_API_BASE_URL || '';

export default function SettingsForm() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const currentStoreId = useReadLocalStorage('currentStoreId');
  const { storeId } = useParams();

  const form = useForm<Inputs>({
    resolver: zodResolver(StoreNameSchema),
    defaultValues: {
      name: '',
    },
  });

  // TODO: Fix store switcher selection after store deletion
  const deleteStore = useMutation<{ message: string }, unknown, { storeId: string }>({
    mutationFn: async (values) => {
      return await deleteStoreApi(values.storeId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const updateStore = useMutation<
    { message: string },
    unknown,
    { name: string; storeId: string | undefined }
  >({
    mutationFn: async (values) => {
      return await updateStoreApi(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message);
    },
  });

  async function onSubmit(data: Inputs) {
    console.log({ ...data, storeId });
    await updateStore.mutateAsync({ ...data, storeId });
  }

  useEffect(() => {
    if (deleteStore.isSuccess) {
      window.location.assign(`/${currentStoreId}/overview`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStore.isSuccess]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => storeId && deleteStore.mutate({ storeId })}
        loading={deleteStore.isLoading}
      />
      <div className="flex items-center justify-between">
        <PageHeading title="Settings" description="Mange store preferences" />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="grid gap-4 max-w-md"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-fit"
            // disabled={login.isLoading}
          >
            Save Changes
            <span className="sr-only">Save Changes</span>
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="VITE_LARAVEL_API_BASE_URL"
        variant="public"
        description={`${origin}/api/stores/${storeId}`}
      />
    </>
  );
}
