import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/webdav': {
        target: 'http://192.168.100.1:8888',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/webdav/, ''),
        configure: (proxy, options) =>
        {
          // 添加这个配置来处理 WebDAV 特殊请求
          proxy.on('proxyReq', (proxyReq, req, res) =>
          {
            // 确保 WebDAV 方法能够正确传递
            if (req.method === 'OPTIONS') {
              proxyReq.setHeader('Access-Control-Request-Method', '*');
            }
          });
        }
      }
    }
  }
});
