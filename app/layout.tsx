import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// config fonts
import {Josefin_Sans} from "next/font/google";

const josefin = Josefin_Sans({
  subsets:["latin"],
  // once the josefin_sans has been downloaded, it will swap with the default
  display:"swap",
})
console.log(josefin);
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
      <body className={`${josefin.className}`}>
        <header>
        <Logo />
        <Navigation />
        </header>
        <main>
        {children}
        </main>
        <footer>Copyright by The Wild Oasis</footer>
        </body>
    </html>
  )
}
