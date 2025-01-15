/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bootcamp-project-api.s3.ap-northeast-2.amazonaws.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 우선 적용
  },
};

export default nextConfig;
