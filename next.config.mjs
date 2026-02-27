/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$cdn: '${process.env.NEXT_PUBLIC_CDN_URL || ''}';`,
  },
};

export default nextConfig;
