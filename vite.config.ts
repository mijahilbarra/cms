import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PifWarriorsCms",
      fileName: () => "pif-warriors-cms.js",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue", "vue-router", "firebase", "firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage"]
    }
  }
});
