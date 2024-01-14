/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tailwindui.com',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            hostname: 'cdn.discordapp.com'
          },
          {
            hostname:'img.clerk.com'
          }
        ],
      },
}

module.exports = nextConfig
