import Link from "next/link";

type Props = {
  call: string;
  title: string;
}

export const CTAConnect = ({call, title}: Props) => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Заинтересовались? <br className='sm:block hidden' />
        {call}
      </p>
      <Link href='/' className='btn'>
        {title}
      </Link>
    </section>
  );
};
