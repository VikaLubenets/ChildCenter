import Link from "next/link";

type Props = {
  title?: string;
}
export const BookingBtn = ({title}: Props) => {
  return (
      <Link href='/' className='btn'>
       {title ?? 'Записаться'}
      </Link>
  );
};
