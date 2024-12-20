import Logo from "@/app/_components/Logo"
import Navigation from "@/app/_components/Navigation"

import "./_styles/globals.css"

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
      <body>
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
