import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            "src/generated/**",
        ],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            // Пробелы внутри фигурных скобок объектов: { value }
            "object-curly-spacing": ["error", "always"],
            // Пробелы внутри фигурных скобок в JSX: { value }
            "react/jsx-curly-spacing": ["error", { "when": "always", "children": true }],
            // Два отступа (пустые строки) между импортами и кодом
            "padding-line-between-statements": [
                "error",
                { "blankLine": "always", "prev": "import", "next": "*" },
                { "blankLine": "any", "prev": "import", "next": "import" }
            ],
        },
    },
];

export default eslintConfig;
