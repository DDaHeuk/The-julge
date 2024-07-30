import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/global.css';
import ReactQueryProvider from '@/provider/reactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Julge',
  description: 'The Julge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="ko">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
