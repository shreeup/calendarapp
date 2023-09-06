/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET_KEY: "secret",
    JWT_EXPIRES_IN: "1d",
    MONGODB_URI:
      "mongodb+srv://user:user@cluster0.0ql9mmu.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
