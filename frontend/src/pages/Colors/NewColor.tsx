import ColorPreview from '@/components/ColorPreview';
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
import { ColorSchema } from '@/lib/validations/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Inputs = z.infer<typeof ColorSchema>;

export default function NewColor() {
  const form = useForm<Inputs>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: '',
      value: '#5b9b8b',
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8 w-full"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Input {...field} placeholder="Color value" />
                    <ColorPreview hexCode={field.value} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
        // disabled={login.isLoading}
        >
          Log in
          <span className="sr-only">Log in</span>
        </Button>
      </form>
    </Form>
  );
}
