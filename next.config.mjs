/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

export default { ...nextConfig };
