import Link from "next/link";
import { ServicesLine } from "./(services)/ServicesLine";

export default function Admin(){
  return (
    <main className="flex flex-col gap-10 py-10 px-8">
      <h1 className="lg:text-2xl text-xl font-bold">Страница администратора сайта</h1>
      <div className="flex flex-col gap-5">
        <h2 className="lg:text-xl text-lg font-bold py-4">Виды услуг</h2>
        <div className="flex gap-5">
          <ServicesLine />
        </div>
      </div>

    </main>
  )
}