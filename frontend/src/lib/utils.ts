import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentRouteNested(
  pathname: string,
  subPath: 'billboards' | 'categories' | 'colors' | 'sizes' | 'orders' | 'products',
): string | undefined {
  const pathnameArr = pathname.split('/');
  const index = pathnameArr.indexOf(subPath);

  return pathnameArr[index + 1];
}
