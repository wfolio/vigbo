import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Logo from "~/icons/logo";

const inter = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  icons: "https://vigbo.com/favicon/vigbo.png",
  description:
    "Vigbo — первый сервис для фотографов: сайт-портфолио, галереи для передачи фото, интернет-магазин",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className="px-5 lg:px-[60px] items-center flex py-[60px]">
          <Link href="/">
            <Logo />
          </Link>
        </header>
        <main className="flex w-full justify-center">
          <div className="w-full min-h-screen h-full flex items-center flex-col px-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
