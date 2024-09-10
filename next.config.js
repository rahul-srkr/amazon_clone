/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
    path: "_next/image"
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig
