import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',                 // ← 배포 경로 고정(정적 리소스 404 예방)
  plugins: [react()],
  // 아래 dev 프록시는 로컬 개발에서만 동작. 배포에는 영향 없음.
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})