import Banner from "./Banner";
import { Pannel } from "./Pannel";

export default function Home() {
  return (
    <article className="flex flex-col justify-center items-center w-full h-full">
      <Banner />
      <Pannel />
    </article>
  );
}
