import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Architecture boundaries. Dependencies flow one way:
  //   app  →  features  →  shared (components, config, hooks, lib)
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: [
                "./src/components",
                "./src/config",
                "./src/hooks",
                "./src/lib",
              ],
              from: ["./src/features", "./src/app"],
              message:
                "Shared code must not depend on features or routes. Move the code into a feature, or pass it in as props.",
            },
            {
              target: "./src/features",
              from: "./src/app",
              message: "Features must not import from the app/ routing layer.",
            },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*", "!@/features/*/server"],
              message:
                "Import a feature through its public entry: '@/features/<name>' (client-safe) or '@/features/<name>/server' (server-only).",
            },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
