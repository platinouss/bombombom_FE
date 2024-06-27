import { clsx, type ClassValue } from 'clsx';
import { DependencyList, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthenticationConfig() {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  };
}

export function useResource<T>(
  supplier: () => Promise<T>,
  deps?: DependencyList | undefined
): T {
  const [resource, setResource] = useState(null as T);
  const fetch = async () => {
    setResource(await supplier());
  };

  useEffect(() => {
    fetch();
  }, deps);

  return resource;
}
