import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shell } from '@/components/Shell';
import { LogInForm } from '@/components/LogInForm';
import { OAuthLogIn } from '@/components/0-auth-log-in';

export default function Login() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>Choose your preferred log in method</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthLogIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <LogInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
            <Link
              aria-label="Sign up"
              to="/register"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Register
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            to="/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  );
}
