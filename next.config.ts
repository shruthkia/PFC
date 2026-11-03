import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// Additional preview hostnames are supplied per process so no environment-specific
// hostname needs to be committed to the repository.
const devOrigins = ["127.0.0.1", "localhost"];
if (process.env.NEXT_DEV_ORIGIN) devOrigins.push(process.env.NEXT_DEV_ORIGIN);

const nextConfig: NextConfig = {
  allowedDevOrigins: devOrigins,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
