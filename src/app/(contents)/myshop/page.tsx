import ShopDetailContainer from '@/components/myInfoComponents/shopDetailContainer';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function myShop() {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId')?.value;

  if (shopId) {
    redirect(`/myshop/${shopId}`);
  }

  return (
    <div className="flex flex-col">
      <ShopDetailContainer />
    </div>
  );
}
