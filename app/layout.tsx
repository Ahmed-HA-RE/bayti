import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME } from '@/lib/constants';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `${APP_NAME} is a UAE real estate platform that helps clients find their dream home. clients can browse properties, book visits, and reserve their favorite homes. ${APP_NAME} also provides tools and resources to make informed decisions and streamline the home-buying process.`,
  openGraph: {
    title: APP_NAME,
    description: `${APP_NAME} is a UAE real estate platform that helps clients find their dream home. clients can browse properties, book visits, and reserve their favorite homes. ${APP_NAME} also provides tools and resources to make informed decisions and streamline the home-buying process.`,
    url: 'https://bayti.ahmedrehandev.net',
    siteName: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} bg-background`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
