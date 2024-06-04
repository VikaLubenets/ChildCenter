import Link from "next/link";
import Image from 'next/image';


const Logo = () => {
  return (
    <Link href="/">
      <div className="mt-5 ml-1 mb-4 flex items-center gap-x-3 rounded-md shadow-md">
        <Image src={"/logo.jpg"} alt={"logo"} width={50} height={50}/>
      </div>
    </Link>
  )
}

export default Logo;