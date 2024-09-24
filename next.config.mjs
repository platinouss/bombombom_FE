/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  generateBuildId: async () => {
    return 'i5JCtxqrbVzVm8aWDr3K2';
  },
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
