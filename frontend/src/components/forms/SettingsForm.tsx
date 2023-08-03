import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
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
import AlertModal from '@/components/models/AlertModal';
import ApiAlert from '@/components/ApiAlert';
import { StoreNameSchema } from '@/lib/validations/store';
import { deleteStoreApi, updateStoreApi } from '@/services/storeServices';
import SettingsHeader from '@/components/PageHeaders/SettingsHeader';
import useStoreApi from '@/hooks/store-api';

type Inputs = z.infer<typeof StoreNameSchema>;

const origin: string = import.meta.env.VITE_LARAVEL_API_BASE_URL || '';

export default function SettingsForm() {
  const { storesQuery } = useStoreApi();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [currentStoreId, setCurrentStoreId] = useLocalStorage<string | undefined>(
    'currentStoreId',
    undefined,
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(StoreNameSchema),
    defaultValues: {
      name: '',
    },
  });

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
    await updateStore.mutateAsync({ ...data, storeId });
    form.reset();
  }

  useEffect(() => {
    if (deleteStore.isSuccess && storesQuery.data) {
      setCurrentStoreId(storesQuery.data[0].id);
      navigate(`/${currentStoreId}/overview`);
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
      <SettingsHeader setOpen={setOpen} />
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
                  <Input {...field} disabled={updateStore.isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit" disabled={updateStore.isLoading}>
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
