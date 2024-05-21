"use client"

import Link from "next/link";
import Image from 'next/image';
import { NavBarItem } from "./NavBarItem";

export const Header = () => {
  return (
    <header className='flex h-1/5 w-full px-4 justify-between'>
        <Link href="/">
          <div className="mt-5 ml-1 p-3 mb-4 flex items-center gap-x-3 rounded-md shadow-md">
            <Image src={"/logo.jpg"} alt={"logo"} width={50} height={50}/>
          </div>
        </Link>
        <nav className="flex" >
          <ul className="flex gap-10 flex-1 items-center justify-end list-none">
            <NavBarItem label="Главная" href={"/"}/>
            <NavBarItem label="О мастерской" href={"/"}/>
            <NavBarItem label="Расписание" href={"/"}/>
            <NavBarItem label="Контакты" href={"/"}/>
            <NavBarItem label="Аренда" href={"/"}/>
          </ul>
        </nav>
    </header>
  )
}