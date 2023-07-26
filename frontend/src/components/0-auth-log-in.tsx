import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const oauthProviders = [
  { name: 'Google', strategy: 'oauth_google', icon: 'google' },
  { name: 'Facebook', strategy: 'oauth_facebook', icon: 'facebook' },
  { name: 'Discord', strategy: 'oauth_discord', icon: 'discord' },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: string;
}[];

export function OAuthLogIn() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];

        return (
          <Button
            aria-label={`Log in with ${provider.name}`}
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            disabled={false !== null}
          >
            {/* {false === provider.strategy ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : ( */}
            <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {/* )} */}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
}
