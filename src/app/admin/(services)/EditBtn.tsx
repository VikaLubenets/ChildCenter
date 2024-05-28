"use client";

import { CiEdit } from "react-icons/ci";
import React from "react";
import Link from "next/link";

export default function EditBtn({ id }: { id: string}) {

  return (
    <Link href={`/admin/editservices/${id}`} className='cursor-pointer'>
      <CiEdit size={24}  />
    </Link>
  );
}