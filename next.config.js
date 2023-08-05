/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'image.tmdb.org',
          port: '',
          pathname: '/t/p/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig;