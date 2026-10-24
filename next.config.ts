import type { NextConfig } from 'next';
// NEXT_DIST_DIR lets a verification build run without clobbering a running `next dev` (.next)
const nextConfig: NextConfig = {distDir:process.env.NEXT_DIST_DIR||'.next'};
export default nextConfig;
