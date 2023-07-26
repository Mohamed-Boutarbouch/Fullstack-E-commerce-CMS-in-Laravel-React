import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('This email is not valid'),
  password: z.string().min(8, {
    message: 'Username must be at least 8 characters.',
  }),
  remember: z.boolean().nullable(),
});

export default function Register() {
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  function submitHandler(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <nav>
        <Button size="icon">Dark</Button>
      </nav>
      <main className="h-full flex justify-center">
        <Card className="w-3/4 max-w-xl h-4/5">
          <div className="h-full flex flex-col">
            <CardHeader className="p-5">
              <CardTitle>Login</CardTitle>
              <CardDescription>Login with your existing account.</CardDescription>
            </CardHeader>
            <form className="px-5 pb-5 space-y-5" onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="john@doe.com" {...register('email')} />
                {/* {<p className="text-destructive font-semibold">First name is required</p>} */}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Your password" {...register('password')} />
                {/* <p className="text-destructive font-semibold">error</p> */}
              </div>

              <div className="flex items-center space-x-2">
                {/* <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <Checkbox
                  id="remember"
                  checked={!!register('remember').value}
                  onChange={(e) => {
                    register('remember').onChange(e.target.checked);
                  }}
                /> */}
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <div className="flex justify-between items-center">
                <Link to="forgot-password" className="underline hover:text-blue-700 transition-all">
                  Forgot your password?
                </Link>
                <Button>Login</Button>
              </div>
            </form>
            <div className="relative my-5 text-primary flex flex-col items-center">
              <p className="absolute -bottom-[9.5px] bg-background px-5">or login with</p>
              <Separator />
            </div>
            <div className="flex-grow py-6 space-y-1.5 flex flex-col items-center justify-center gap-5">
              <Button>Login with Google</Button>
              <div>
                You don't have an account?&nbsp;
                <Link to="register" className="underline hover:text-blue-700 transition-all">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
