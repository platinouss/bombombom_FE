import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthenticationConfig() {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  };
}
