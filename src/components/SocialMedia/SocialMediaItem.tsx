"use client"

import Link from "next/link";
import Image from 'next/image';

type Props = {
  sourse: string;
  name: string;
  href: string;
}

export const SocialMediaItem = ({
  sourse, 
  name,
  href
}: Props) => {

  return (
    <li className="justify-start">
      <Link href={href} className="">
        <Image src={sourse} alt={name} width={30} height={30}/>
      </Link>
    </li>
  )
}