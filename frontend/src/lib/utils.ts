import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SubPathProps = 'billboards' | 'categories' | 'colors' | 'sizes' | 'orders' | 'products';

export function getCurrentRouteNested(pathname: string, subPath: SubPathProps): string | undefined {
  const pathnameArr = pathname.split('/');
  const index = pathnameArr.indexOf(subPath);

  return pathnameArr[index + 1];
}
