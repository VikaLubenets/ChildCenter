import Header from "@/components/Header";
import SocialMedia from "@/components/SocialMedia";
import React from "react";

type Props = {
  children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
  return (
    <>
      <Header />
      <main className="flex justify-start items-center h-[80vh] w-full">
          <SocialMedia />
          {children}
      </main>
    </>
  )
}

export default MainLayout;