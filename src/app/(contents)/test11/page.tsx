import MyPostInfo from '@/components/myPostInfo';
import MyShopInfo from '@/components/myShopInfo';

export default function test11() {
  return (
    <div>
      <MyShopInfo />
      <MyPostInfo deadline={true} />
    </div>
  );
}
