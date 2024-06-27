import { clsx, type ClassValue } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthenticationConfig() {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  };
}

interface WrappedPromise<T> {
  read: () => T;
}

export function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
  let status = 'pending';
  let response: T;
  let error: any;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw error;
      default:
        return response;
    }
  };

  return { read };
}

export function useResource<T>(fetchData: () => Promise<T>): [T, () => void] {
  const [resource, setResource] = useState(
    null as unknown as WrappedPromise<T>
  );
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    setResource(wrapPromise(fetchData()));
  }, [trigger]);
  return [resource?.read(), () => setTrigger(Date.now())];
}
