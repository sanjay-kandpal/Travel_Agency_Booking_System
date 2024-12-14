const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['example.com'], // Add domains for external images
    },
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:5000/api'
    }
  };
  
export default nextConfig;
