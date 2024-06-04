'use client'
import Link from "next/link";

import { useSession } from 'next-auth/react';
import { ServicesLine } from '@/app/admin/(services)/ServicesLine';
import About from '@/app/admin/(about)/About';
import Contacts from '@/app/admin/(contacts)/Contacts';
import Certificates from '@/app/admin/(certificates)/Certificates';
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";


export default function AdminPage() {
  const session = useSession();
  const router = useRouter();
  console.log(session)

  if (session.status === 'loading') {
    return <Loader />
  } else if (session.status === 'unauthenticated') {
    router.push('/auth/signin')
  } 

  return (
    <article className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Link href={"/admin/schedule"} className='btn'>
          Изменить расписание
        </Link>
        <ServicesLine />
        <Contacts />
        <About />
        <Certificates />
      </div>
    </article>
  );
}