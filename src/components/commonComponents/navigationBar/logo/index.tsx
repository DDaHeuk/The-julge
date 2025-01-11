import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="pr-[2.362px] md:pr-[3.15px] py-[7.5px] md:py-[10px] items-center shrink-0">
      <Link href="/">
        <Image
          className="md:w-[108.851px] md:h-[20px]"
          src="/images/logo.svg"
          alt="로고 이미지"
          width={108.851}
          height={20}
        />
      </Link>
    </div>
  );
};
export default Logo;
