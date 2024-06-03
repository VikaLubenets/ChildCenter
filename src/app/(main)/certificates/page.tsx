'use client'

import BookingBtn from "@/components/BookingBtn";
import Loader from "@/components/Loader/Loader";
import { Certificate } from "@/constants/DBTypes";
import { getCertificates } from "@/store/queries/certificates";
import { useEffect, useState } from "react";

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificateData = await getCertificates();
      if(certificateData){
        setCertificates(certificateData.certificates);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return(
      <article className="article">
        <div className="flex justify-between w-[95%]">
          <h2 className="subtitle-header">Подарочные сертификаты</h2>
          <BookingBtn title='Купить' />
        </div>
          {certificates && certificates.map(certificate => {
            return(
            <div className="flex justify-between p-3 border border-black rounded-md w-[90%]">
              <h2>{certificate.title}</h2>
              <p>{certificate.price}</p>
            </div>
            )
          })}
      </article>
  )
};

export default CertificatesPage;