import Link from "next/link";


export const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Заинтересовались? <br className='sm:block hidden' />
        Подберите занятие интересное вашему ребенку
      </p>
      <Link href='/schedule' className='btn'>
        Смотреть расписание
      </Link>
    </section>
  );
};
