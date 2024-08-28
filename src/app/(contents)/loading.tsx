import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 ">
      <Image src="/images/logo.svg" alt="logo_image" width={150} height={150} />
      <Image
        src="/icons/loading_spinner.gif"
        alt="loading_spinner"
        width={50}
        height={50}
        unoptimized
      />
    </div>
  );
}
