import type { Metadata } from 'next';
import Footer from '@/components/commonComponents/footer';
import NavigationBar from '@/components/commonComponents/navigationBar';

export const metadata: Metadata = {
  title: 'The Julge',
  description: 'The Julge',
};

export default function ContentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex-col min-h-screen">
      <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
        <NavigationBar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
