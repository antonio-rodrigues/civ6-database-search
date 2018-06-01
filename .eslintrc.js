module.exports = {
  root: true,
  settings: {
    "html/indent": "0",
    es6: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any"
      }
    ],
    "import/first": 0,
    // "import/no-deprecated": process.env.NODE_ENV === "production" ? 0 : 1,
    // "import/no-unresolved": ["error", { commonjs: true }],
    // "import/named": "error",
    "one-var": ["error", { initialized: "never" }],
    "no-mixed-operators": 0,
    "no-var": "error",
    "require-await": "error"
  }
};
