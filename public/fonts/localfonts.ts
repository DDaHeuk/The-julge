import localFont from 'next/font/local';

const spoqaHanSansNeo = localFont({
  src: [
    {
      path: './SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});
export default spoqaHanSansNeo;
