import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "method",
          modifiers: ["private"],
          format: ["camelCase"],
          custom: {
            regex: "^#",
            match: true,
          },
        },
        {
          selector: "method",
          modifiers: ["protected"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
      ],
    },
  },
  {
    files: ["**/*.mjs", "**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  }
);
