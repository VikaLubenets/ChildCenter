import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <section className="flex lg:flex-row flex-col-reverse justify-between items-center gap-20">
      <Image src={'/images/marketing/child.png'} alt={'child banner image'} width={306} height={327}/>
      <div className='flex flex-col gap-10'>
        <h1 className='font-extrabold lg:text-4xl text-2xl'>Творческая мастерская</h1>
        <h2>Сделайте вклад в развитие вашего ребенка</h2>
        <Link 
          className='btn' 
          href={'/menu'}
        >
          Выбрать занятие
        </Link>
      </div>
    </section>
  )
};

export default Banner;