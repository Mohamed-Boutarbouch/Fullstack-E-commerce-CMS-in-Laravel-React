import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RegisterForm } from '@/components/RegisterForm';
import { Shell } from '@/components/Shell';
import { OAuthLogIn } from '@/components/0-auth-log-in';

export default function Register() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Choose your preferred registration method</CardDescription>
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
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?&nbsp;
            <Link
              aria-label="Log in"
              to="/log-in"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}
