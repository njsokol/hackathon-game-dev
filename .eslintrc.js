module.exports = {
    env: {
        browser: true,
        es6: true,
        jasmine: true,
        amd: true,
        commonjs: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:jasmine/recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["jasmine"],
    rules: {
        "max-len": ["error", { code: 100, comments: 100 }], //enforce a maximum line length
        indent: ["error"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "always"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        eqeqeq: ["error", "always"],
    },
};
