import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function SelectField() {
  const form = useForm();
  function onSubmit() {}
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                // disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              />
              <FormControl>
                <SelectTrigger>
                  <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* {billboards.map((billboard) => (
                  <SelectItem key={billboard.id} value={billboard.id}>
                    {billboard.label}
                  </SelectItem>
                ))} */}
              </SelectContent>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
