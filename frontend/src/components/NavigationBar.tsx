import { HTMLAttributes, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';

import { cn } from '@/lib/utils';

export default function NavigationBar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();
  const currentStoreId = useReadLocalStorage('currentStoreId');

  useEffect(() => {
    if (!currentStoreId) {
      navigate('/');
    }
  }, [currentStoreId, navigate]);

  const routes = [
    {
      href: `/${currentStoreId}/overview`,
      label: 'Overview',
    },
    {
      href: `/${currentStoreId}/billboards`,
      label: 'Billboards',
    },
    {
      href: `/${currentStoreId}/categories`,
      label: 'Categories',
    },
    {
      href: `/${currentStoreId}/sizes`,
      label: 'Sizes',
    },
    {
      href: `/${currentStoreId}/colors`,
      label: 'Colors',
    },
    {
      href: `/${currentStoreId}/products`,
      label: 'Products',
    },
    {
      href: `/${currentStoreId}/orders`,
      label: 'Orders',
    },
    {
      href: `/${currentStoreId}/settings`,
      label: 'Settings',
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {routes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary aria-[current=page]:text-primary"
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
