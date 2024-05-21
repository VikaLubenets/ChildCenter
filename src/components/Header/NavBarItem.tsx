"use client"

import Link from "next/link";

type Props = {
  label: string;
  href: string;
}

export const NavBarItem = ({
  label, 
  href
}: Props) => {

  return (
    <li className="justify-start list-none">
      <Link href={href} className="flex items-center justify-center text-black">
        {label}
      </Link>
    </li>
  )
}