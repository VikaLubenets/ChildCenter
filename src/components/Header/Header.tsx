"use client"

import Logo from "../Logo";
import { NavBarItem } from "./NavBarItem";

export const Header = () => {
  return (
    <header className='lg:flex h-[20vh] z-10 w-full px-4 justify-between items-center hidden'>
        <Logo />
        <nav className="flex">
          <ul className="flex gap-4 flex-1 items-center justify-end list-none">
            <NavBarItem label="Главная" href={"/"} />
            <NavBarItem label="О мастерской" href={"/about"} />
            <NavBarItem label="Расписание" href={"/schedule"} />
            <NavBarItem label="Мастера" href={"/masters"} />
            <NavBarItem label="Контакты" href={"/contacts"} />
            <NavBarItem label="Аренда" href={"/rent"} />
          </ul>
        </nav>
    </header>
  )
}