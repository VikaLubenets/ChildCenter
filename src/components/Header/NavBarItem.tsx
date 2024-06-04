"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

type NavBarItemProps = {
  label: string;
  href: string;
};

export const NavBarItem = ({ label, href }: NavBarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={`justify-start list-none rounded-md ${
      isActive ? 'text-[#D08D85] pointer-events-none' : 'text-black'
    }`}>
      <Link href={href} className="flex items-center justify-center hover:text-[#D08D85] active:text-green-500">
        {label}
      </Link>
    </li>
  );
};