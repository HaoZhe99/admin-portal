/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          fs: false,
          request: false
        }
      }
    }

    return config
  }
};

export default { ...nextConfig };
