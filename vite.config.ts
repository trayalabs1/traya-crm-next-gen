import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env": env,
    },
    server: {
      port: 3001,
    },
    preview: {
      port: 4001,
    },
  };
});
