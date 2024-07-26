import { NavigationMenuLink } from '@/components/ui/navigation/navigation-menu';
import Link from 'next/link';

interface HeaderNavMenuProps {
  title: string;
  href: string;
  icon?: React.ReactNode; // icon prop 추가
}

export default function HeaderNavMenu({
  title,
  href,
  icon
}: HeaderNavMenuProps) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        prefetch={false}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </Link>
    </NavigationMenuLink>
  );
}
