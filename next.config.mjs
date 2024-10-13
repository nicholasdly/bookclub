/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // This is necessary for password hashing to function properly.
    config.externals.push("@node-rs/argon2");
    return config;
  },
};

export default nextConfig;
