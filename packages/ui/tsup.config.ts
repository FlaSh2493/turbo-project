import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.d.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  bundle: false,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  onSuccess: async () => {
    // CSS는 build:css 스크립트에서 Tailwind CLI로 처리
    console.log(
      "TypeScript build complete. Run 'build:css' to build CSS files.",
    );
  },
});
