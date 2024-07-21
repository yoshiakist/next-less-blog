import { getApp } from '@/lib/newt'
import { Shippori_Mincho, Baskervville } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/footer"
import Link from 'next/link'

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: "500"
});
const baskervville = Baskervville({
  subsets: ['latin'],
  weight: "400"
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = await getApp()

  return (
    <html lang="ja">
      <body className={shipporiMincho.className}>
        <header
          className={`${baskervville.className} header`}
        >
          <div className="container">
            <h1 style={styles.siteName}>
              <Link href={'/'}>{app.name}</Link>
            </h1>
          </div>
        </header>
        <main>
          <div className="container">
            {children}
          </div>
        </main>
        <Footer/>
      </body>
    </html>
  );
}

const styles: {[key: string]: React.CSSProperties} = {
  siteName: {
    fontSize: '1rem',
    letterSpacing: '0.15em',
  },
  body: {
    background: '#ddd',
    flex: 1,
  }
};