'use client'

import AdminContainer from "@/components/AdminContainer";
import Loader from "@/components/Loader/Loader";
import { Certificate } from "@/constants/DBTypes";
import { deleteCertificate, getCertificates } from "@/store/queries/certificates";
import { useEffect, useState } from "react";

export default function Certificates(){
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificateData = await getCertificates();
      console.log(certificateData)
      if (certificateData) {
        setCertificates(certificateData.certificates);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleRemove = (id: string) => {
    setCertificates((prevServices) => prevServices.filter(certificate => certificate._id !== id));
  };

  return(
    <AdminContainer
      header={"Подарочные сертификаты"}
      info={certificates}
      onRemove={handleRemove}
      deleteFunction={deleteCertificate}
      basePath={"/admin/editcertificate"}
      addBtnName={"Добавить сертификат"}
      addBtnPath={"/admin/addcertificate"}
    />
  )
}