import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      // Allow unused parameters (useful for event handlers, etc.)
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      // Allow unused imports
      "unused-imports/no-unused-imports": "off",
      "unused-imports/no-unused-vars": "off"
    }
  }
];

export default eslintConfig;
