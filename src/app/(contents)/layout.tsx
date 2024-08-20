import type { Metadata } from 'next';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'The Julge',
  description: 'The Julge',
};

export default function ContentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId')?.value;
  const userId = cookieStore.get('userId')?.value;
  const myType = cookieStore.get('myType')?.value;

  return (
    <div className=" flex-col min-h-screen">
      <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
        <NavigationBar shopId={shopId} userId={userId} myType={myType} />
        {children}
      </div>
      <Footer />
    </div>
  );
}
