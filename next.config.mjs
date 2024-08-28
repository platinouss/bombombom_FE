/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/solvedac/:path*',
        destination: 'https://solved.ac/api/v3/:path*'
      }
    ];
  },
  output: 'standalone'
};

export default nextConfig;
