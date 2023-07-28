import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

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
import { createStore } from '@/services/storeServices';

export default function CreateStoreModal() {
  const { user } = useAuth({ middleware: 'auth' });
  const userId = user.data!.id;

  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof storeNameSchema>>({
    resolver: zodResolver(storeNameSchema),
    defaultValues: {
      name: '',
    },
  });

  const storeMutation = useMutation({
    mutationFn: createStore,
  });

  async function onSubmit(values: z.infer<typeof storeNameSchema>) {
    await storeMutation.mutateAsync({ ...values, userId });
  }

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
                  type="button"
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
