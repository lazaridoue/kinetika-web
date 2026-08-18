import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    // Playwright owns e2e/. Vitest's default glob would otherwise pick up the
    // .spec.ts files there and fail with "Playwright Test did not expect
    // test() to be called here."
    exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"],
  },
  resolve: { alias: { "@": import.meta.dirname } },
});
