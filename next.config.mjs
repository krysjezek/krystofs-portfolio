/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$cdn: '${process.env.NEXT_PUBLIC_CDN_URL || ''}';`,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ziwvaiplle7bdzaz.public.blob.vercel-storage.com' },
    ],
  },
};

export default nextConfig;
