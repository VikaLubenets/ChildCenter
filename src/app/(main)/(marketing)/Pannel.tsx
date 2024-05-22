import Link from "next/link";
import Image from 'next/image';

export const Pannel = () => {
  return (
    <section className="flex px-5" style={{ backgroundColor: "rgb(var(--foreground-rgb-marketing-pannel))" }}>
      <div className="flex flex-col pt-4 gap-[30px] text-white">
        <h2 className="lg:text-xl text:lg">Занятия</h2>
        <p>Регулярные занятия творчеством для детей</p>
        <Link href={"/lessons"} className="cursor-pointer w-full flex gap-5 items-center text-black">
          Узнать больше
          <Image 
          src='/icons/arrow.svg' 
          alt='arrow icon' 
          width={14}
          height={15}
          className='w-4 h-4 object-contain'
          />
        </Link>
      </div>
      <div className="flex flex-col pt-4 gap-[30px] text-white">
        <h2 className="lg:text-xl text:lg">Мастер-классы</h2>
        <p>Разовые занятия творчеством</p>
        <Link href={"/masterclass"} className="cursor-pointer w-full flex gap-5 items-center text-black">
          Узнать больше
          <Image 
          src='/icons/arrow.svg' 
          alt='arrow icon' 
          width={14}
          height={15}
          className='w-4 h-4 object-contain'
          />
        </Link>
      </div>
      <Image src={"/images/marketing/lesson.jpg"} alt={""} width={222} height={208} className='mr-4'/>
      <div className="flex flex-col pt-4 gap-[30px] text-white">
        <h2 className="lg:text-xl text:lg">Эко-творчество</h2>
        <p>Экологическое направление для детей</p>
        <Link href={"/ecological"} className="cursor-pointer w-full flex gap-5 items-center text-black">
          Узнать больше
          <Image 
          src='/icons/arrow.svg' 
          alt='arrow icon' 
          width={14}
          height={15}
          className='w-4 h-4 object-contain'
          />
        </Link>
      </div>
      <div className="flex flex-col pt-4 gap-[30px] text-white">
        <h2 className="lg:text-xl text:lg">Подарочные сертификаты</h2>
        <p>Порадуйте близких подарочным сертификатом на наши занятия</p>
        <Link href={"/certificates"} className="cursor-pointer w-full flex gap-5 items-center text-black">
          Узнать больше
          <Image 
          src='/icons/arrow.svg' 
          alt='arrow icon' 
          width={14}
          height={15}
          className='w-4 h-4 object-contain'
          />
        </Link>
      </div>
    </section>
  )
}