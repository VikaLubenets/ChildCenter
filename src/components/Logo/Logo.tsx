import Link from "next/link";
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center h-full">
      <div className="flex items-center justify-center gap-x-3 h-full">
        <Image className="rounded-md shadow-md" src="/logo.jpg" alt="logo" width={50} height={50} />
      </div>
    </Link>
  )
}

export default Logo;