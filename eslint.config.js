import { defineConfig, globalIgnores } from "eslint/config";
import html from "eslint-plugin-html";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// ESM workaround for __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        plugins: {
            html,
            tailwindcss,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },

        extends: compat.extends(
            "eslint:recommended",
            "plugin:tailwindcss/recommended"
        ),
        rules: {},
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            sourceType: "script",
        },
        files: ["**/.eslint.config.{js,cjs}"],
    },
    globalIgnores([
        "**/tailwind.config.js",
        "static/js/lightense.min.js",
    ]),
]);
