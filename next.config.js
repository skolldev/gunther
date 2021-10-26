const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    key: "Content-Security-Policy",
    value:
      "script-src 'strict-dynamic' 'nonce-rAnd0m123' 'unsafe-inline' http: https:; object-src 'none'; base-uri 'none'; require-trusted-types-for 'script';"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin"
  },
  {
    key: "Permission-Policy",
    value: "microphone=(),geolocation=*"
  }
];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com"
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  }
};
