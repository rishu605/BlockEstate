/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;