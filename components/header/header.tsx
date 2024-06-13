import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import userIcon from '@/public/user-icon.svg';
import { Button } from '@/components/ui/button';
import HeaderNavMenu from '@/components/header/header-nav-menu';

export default function Header() {
  return (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src={userIcon.src}
                width="32"
                height="32"
                className="rounded-full border"
                alt="Avatar"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <Link href="#" prefetch={false}>
                로그인
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/users/signup" prefetch={false}>
                회원가입
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
