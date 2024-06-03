import Link from "next/link";
import About from "./(about)/About";
import Certificates from "./(certificates)/Certificates";
import Contacts from "./(contacts)/Contacts";
import { ServicesLine } from "./(services)/ServicesLine";

export default function Admin(){
  return (
    <main className="flex flex-col gap-10 py-10 px-8">
      <h1 className="lg:text-2xl text-xl font-bold">Страница администратора сайта</h1>
      <div className="flex flex-col gap-5">
          <Link href={"/admin/schedule"} className='btn'>
            Изменить расписание
          </Link>
          <ServicesLine />
          <Contacts />
          <About />
          <Certificates />
      </div>

    </main>
  )
}