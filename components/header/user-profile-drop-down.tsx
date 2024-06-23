"use client";

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/dropdown/dropdown-menu';
import { Button } from '@/components/ui/button';
import userIcon from '@/public/user-icon.svg';
import { User } from '@/types/user/user';
import { useResetRecoilState } from 'recoil';
import { userState } from '@/recoil/userAtom';

export default function UserProfileDropDown( user : User) {
  const resetUserState = useResetRecoilState(userState);

  function handleLogout() {
    console.log('Logging out...');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    resetUserState();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src={user?.image === null ? userIcon.src : user.image}
            width="32"
            height="32"
            className="rounded-full border"
            alt="Avatar"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <div className='w-full' onClick={handleLogout}>
            <Link href="/" prefetch={false}>로그아웃</Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
