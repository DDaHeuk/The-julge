import Button from '@/components/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex">
      {' '}
      <Link href="/signup">
        <Button type="button" className="w-[300px]">
          회원가입
        </Button>
      </Link>
      <Link href="/signin">
        <Button type="button" className="w-[300px]">
          로그인
        </Button>
      </Link>{' '}
    </div>
  );
}
