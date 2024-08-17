import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/global.css';
import ReactQueryProvider from '@/provider/reactQueryProvider';
import { Toaster } from 'sonner';

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
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="bottom-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
