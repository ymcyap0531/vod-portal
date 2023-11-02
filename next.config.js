/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "beta.classico-vod.com", 
      "cdn.classico-vod.com", 
      "cdn.superclassics.tv", 
      "cdn.oldiesfavorite.com", 
      "cdn.longandgone.com",
      "cdn.timelessvod.com",
      "cdn.alltimeflix.com",
      "cdn.greenvod.com",
      "cdn.seasonvod.com"
    ],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
    NEXT_PUBLIC_CONTENT_MOVIE_URL: process.env.NEXT_PUBLIC_CONTENT_MOVIE_URL,
    NEXT_PUBLIC_CONTENT_IMAGE_URL: process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_LOCAL_DOMAIN: process.env.NEXT_PUBLIC_LOCAL_DOMAIN,
    NEXT_PUBLIC_CLASS_DOMAIN: process.env.NEXT_PUBLIC_CLASS_DOMAIN,
    NEXT_PUBLIC_PAYMENT_API_URL: process.env.NEXT_PUBLIC_PAYMENT_API_URL,
    NEXT_PUBLIC_CAMPAIGN_ID: process.env.NEXT_PUBLIC_CAMPAIGN_ID,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

module.exports = nextConfig;
