import BookingBtn from "@/components/BookingBtn";
import CTA from "@/components/CTA";

const Events = () => {
  return(
    <article className="article">
      <div className="flex justify-between w-[95%]">
        <h2 className="subtitle-header">Занятия</h2>
        <BookingBtn />
      </div>
      <p>Текст</p>
      <CTA />
    </article>
  )
};

export default Events;