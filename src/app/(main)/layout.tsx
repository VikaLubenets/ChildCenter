import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import SocialMedia from "@/components/SocialMedia";
import React from "react";

type Props = {
  children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
  return (
    <>
      <Header />
      <MobileHeader />
      <main className="flex justify-start items-center lg:h-[70vh] h-full w-full">
          <SocialMedia />
          {children}
      </main>
    </>
  )
}

export default MainLayout;