import Link from "next/link";
import About from "../(about)/About";
import Certificates from "../(certificates)/Certificates";
import Contacts from "../(contacts)/Contacts";
import { ServicesLine } from "../(services)/ServicesLine";

export default function Admin() {
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
  )
}