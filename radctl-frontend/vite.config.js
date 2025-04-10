import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import morgan from 'morgan';
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [
  //   {
  //     name: 'log-requests',
  //     configureServer(server) {
  //       server.middlewares.use(morgan('dev')); // Логирование запросов
  //     },
  // },
  react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // host: '0.0.0.0',
    port: 5173,
  },
})
