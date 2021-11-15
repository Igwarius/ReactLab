/*
tslint won't be supported: https://github.com/palantir/tslint/issues/4534
you should use typescript-eslint/eslint-plugin: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
but you can't do it with {parser: 'babel-eslint'}: https://github.com/typescript-eslint/typescript-eslint#what-about-babel-and-babel-eslint
*/
/** @type {import("eslint").Linter.Config} */
const NODE_ENV = process.env.NODE_ENV === "production" ? "error" : "off";
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["eslint:recommended", "airbnb", "prettier", "plugin:@typescript-eslint/recommended"],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    DEV_SERVER: true,
    API_DOMAIN: true,
  },
  plugins: ["json", "prettier", "import", "@typescript-eslint", "unused-imports"],
  rules: {
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        fixToUnknown: true,
        ignoreRestArgs: false,
      },
    ],
    "jsx-a11y/label-has-associated-control": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-use-before-define": "off",
    "import/no-extraneous-dependencies": "off",
    "require-await": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "newline-before-return": "error",
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/destructuring-assignment": 0,
    // "react/jsx-max-props-per-line": [1, { maximum: 1 }], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
    // "react/jsx-first-prop-new-line": [1, "multiline"], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-curly-newline": 0, // it conflicts with prettier
    "react/jsx-wrap-multilines": ["error", { arrow: true, return: true, declaration: true }],
    "spaced-comment": ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    "no-underscore-dangle": 0,
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "no-console": NODE_ENV,
    "no-debugger": NODE_ENV,
    "no-alert": NODE_ENV,
    "no-plusplus": 0,
    "class-methods-use-this": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: ["./tsconfig.json"],
      },
    },
  },
};
