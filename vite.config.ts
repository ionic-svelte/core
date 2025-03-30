import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "ionicSvelteCore",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@ionic/core", "@ionic/core/components", "@ionic/core/css"],
      output: {
        preserveModules: true,
        exports: "named",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
