import BookingBtn from "@/components/BookingBtn";
import CTA from "@/components/CTA";

const CertificatesPage = () => {
  return(
    <article className="article">
      <div className="flex justify-between w-[95%]">
        <h2 className="subtitle-header">Подарочные сертификаты</h2>
        <BookingBtn title='Купить' />
      </div>
      <p>Текст</p>
    </article>
  )
};

export default CertificatesPage;