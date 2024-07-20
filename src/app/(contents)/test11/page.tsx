import Button from '@/components/button/indext';
import MyPostInfo from '@/components/myPostInfo';
import MyShopInfo from '@/components/myShopInfo';

export default function test11() {
  return (
    <div>
      <MyShopInfo />
      <MyPostInfo deadline={true} />
      <Button className="w-[100%]" color="filled">
        등록하기
      </Button>
    </div>
  );
}
