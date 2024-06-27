'use client';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { login } from '@/lib/api/auth/login';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      const data = response.data;
      localStorage.setItem('accessToken', data.access_token);
      console.log('data', data);
      console.log('local', localStorage.getItem('accessToken'));
      location.href = '/';
    } catch (error) {
      console.log(error);
      toast.error('아이디 혹은 비밀번호를 확인해주세요');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex justify-center">
          <Link href="/">
            <MountainIcon className="h-8 w-8" />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Username</Label>
            <Input
              id="username"
              placeholder="username"
              required
              type="id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
        <div className="flex items-center justify-between text-sm">
          <Link className="underline underline-offset-2" href="#">
            Forgot password?
          </Link>
          <Link className="underline underline-offset-2" href="/users/signup">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
