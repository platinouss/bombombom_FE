'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import HeaderNavMenu from '@/components/header/header-nav-menu';
import UserProfileDropDown from '@/components/header/user-profile-drop-down';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/userAtom';
import { usePathname } from 'next/navigation';
import { me } from '@/lib/api/users/me'; // API 함수 경로에 맞게 수정

export default function Header() {
  const [user, setUser] = useRecoilState(userState);
  const pathname = usePathname();
  

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null || user !== null) {
      return;
    }
    async function fetchUser() {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchUser();
  }, [user, setUser]);

  return (
    pathname === '/login' ? null :
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <HeaderNavMenu title="알고리즘 스터디" href="#" />
          <HeaderNavMenu title="기술서적 스터디" href="#" />
          <HeaderNavMenu title="강의" href="#" />
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        {user === null ? 
        <Link href="/login" prefetch={false}><Button>로그인</Button></Link>
        : <UserProfileDropDown {...user} />}
      </div>
    </header>
  );
}

function MountainIcon(props: Record<string, string>) {
  return (
    <svg
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
