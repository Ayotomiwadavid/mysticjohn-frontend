
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Block 1: Landing components cannot import dashboard components
    ignores: [
        "app/dashboard/**/*",
        "components/dashboard/**/*",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/dashboard/*", "**/components/dashboard/*"],
              message: "Landing components cannot import dashboard components. Keep landing and dashboard areas separate.",
            },
          ],
        },
      ],
    },
  },
  {
    // Block 2: Dashboard components cannot import landing components
    files: [
        "app/dashboard/**/*",
        "components/dashboard/**/*",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/landing/*", "**/components/landing/*"],
              message: "Dashboard components cannot import landing components. Keep landing and dashboard areas separate.",
            },
          ],
        },
      ],
    },
  },
];
