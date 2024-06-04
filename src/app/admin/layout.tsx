'use client'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
  const session = useSession();
  return (
    <>
      <header className="lg:text-2xl text-xl font-bold pt-5 px-8 flex justify-between">
        <Link href={"/admin"} className='hover:text-slate-600 active:text-green-500'>
            Страница администратора сайта
        </Link>
        <Link href={"/"} className='hover:text-slate-600 active:text-green-500'>
            На сайт
        </Link>
        {session.data && <Link onClick={() => {signOut({callbackUrl: '/auth/signin'})}} href={"#"} className='hover:text-slate-600 active:text-green-500'>
            Выйти
        </Link>}
      </header>
      <main className="flex justify-center items-center h-full w-full p-5">
          {children}
      </main>
    </>
  )
}

export default MainLayout;