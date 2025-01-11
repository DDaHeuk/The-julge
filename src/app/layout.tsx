import type { Metadata } from 'next';
import '@/app/global.css';
import ReactQueryProvider from '@/provider/reactQueryProvider';
import { Toaster } from 'sonner';
import spoqaHanSansNeo from '../../public/fonts/localfonts';

export const metadata: Metadata = {
  title: '3배 Julge',
  description: 'The Julge',
  icons: {
    icon: '/images/logo.svg',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={spoqaHanSansNeo.className}>
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
