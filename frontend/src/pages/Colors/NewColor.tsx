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
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Inputs = z.infer<typeof ColorSchema>;

export default function NewColor() {
  const [hexCode, setHexCode] = useState('#5b9b8b');

  const form = useForm<Inputs>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: '',
      value: '',
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
  }

  const gg = () => setHexCode(form.watch().value);

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
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
                <Input type="text" {...field} onChange={gg} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ColorPreview hexCode={hexCode} />
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
