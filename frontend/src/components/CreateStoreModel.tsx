import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useStoreModal } from '@/hooks/store-modal';
import { Button } from '@/components/ui/button';
import { storeNameSchema } from '@/lib/validations/store';
import { useAuth } from '@/hooks/auth';
import { useCreateStoreMutation } from '@/hooks/create-store-mutation';

export default function CreateStoreModal() {
  const { user } = useAuth({ middleware: 'auth' });
  const userId = user.data && user.data!.id;

  const storeMutation = useCreateStoreMutation();
  const storeModal = useStoreModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStoreId] = useLocalStorage<string | undefined>('currentStoreId', undefined);

  const form = useForm<z.infer<typeof storeNameSchema>>({
    resolver: zodResolver(storeNameSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof storeNameSchema>) {
    await storeMutation.mutateAsync({ ...values, userId });
  }

  useEffect(() => {
    if (storeMutation.isSuccess) {
      setCurrentStoreId(storeMutation.data.id);
      window.location.assign(`/${storeMutation.data.id}/overview`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeMutation.isSuccess]);

  useEffect(() => {
    if (!storeModal.isOpen) {
      form.reset({ name: '' });
    }
  }, [form, form.reset, storeModal.isOpen]);

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={storeMutation.isLoading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="reset"
                  disabled={storeMutation.isLoading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={storeMutation.isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
