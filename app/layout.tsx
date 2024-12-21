
import Header from "@/app/_components/Header";
// config fonts
import {Josefin_Sans} from "next/font/google";

const josefin = Josefin_Sans({
  subsets:["latin"],
  // once the josefin_sans has been downloaded, it will swap with the default
  display:"swap",
})
// console.log(josefin);
import "./_styles/globals.css";

export const metadata={
  // 
title:{
  template:"%s | The Wild Oasis",
  default:"Welcome | The Wild Oasis"
  },
  // good for SEO
  description: "Luxuries cabin hotel located in the heart of Banff, surrounded by beautiful snowy moutains and dark forests. ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative `}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full ">
        {children}
        </main>
        </div>
        
        </body>
    </html>
  )
}
