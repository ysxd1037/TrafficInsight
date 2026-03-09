import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 仓库名为 TrafficInsight，对应访问路径：
  // https://ysxd1037.github.io/TrafficInsight/
  // 因此前后都使用斜杠
  base: '/TrafficInsight/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
