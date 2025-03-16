import type { Metadata } from "next";
import { TelegramProvider } from "./providers/TelegramProvider";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.scss";


const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: ".smpl",
  description: ".smpl",
  icons: {
    icon: '/icons/favicon.svg',
    shortcut: '/icon-192x192.png',
    apple: '/icon-192x192.png',
    other: {
      rel: 'icon',
      url: '/icon-512x512.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body>
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
