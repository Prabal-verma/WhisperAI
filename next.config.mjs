/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google user content
        port: '', // Optional, leave empty if there's no specific port
        pathname: '/**', // Allow all paths
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
        port: '', // Optional, leave empty if there's no specific port
        pathname: '/**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
