import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_API_URL"])
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      }
    },
    define: {
      // __APP_ENV__: env.APP_ENV,
      'process.env': env
    }
  }
})
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },  
//   // vue-router docs explain like below, but,
//   // from vite 2.9, manualChunks is no longer modified by default.
//   // build: {
//   //   rollupOptions: {
//   //     output: {
//   //       manualChunks: {
//   //         jobs: ["@/views/JobSearchResultsView.vue", "@/views/JobView.vue"],
//   //       },
//   //     },
//   //   },
//   // },
// });
