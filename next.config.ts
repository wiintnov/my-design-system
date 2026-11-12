import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 휴대폰으로 미리보기(npm run dev)를 열 때 쓰는 이 컴퓨터의 와이파이 주소.
  // 와이파이가 바뀌면 주소도 바뀌어요 → `npm run dev` 첫 줄의 Network 주소로 고쳐요.
  allowedDevOrigins: ["10.30.7.196"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
