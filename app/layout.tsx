import { getApp, getTags } from '@/lib/switcher'
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/footer"
import { Header } from "../components/header"

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: "500"
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = await getApp()
  const tags = await getTags()

  return (
    <html lang="ja">
      <body className={shipporiMincho.className}>
        <Header appName={app.name} />
        <main>
          <div className="container">
            {children}
          </div>
        </main>
        <Footer tags={tags}/>
      </body>
    </html>
  );
}
