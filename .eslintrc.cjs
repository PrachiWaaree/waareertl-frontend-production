module.exports = {
    root: true,
    extends: ["next/core-web-vitals"],
    rules: {
        "react-hooks/refs": "off",
        "react-hooks/rules-of-hooks": "warn",
        "no-extra-boolean-cast": "warn",
        "no-case-declarations": "warn",
        "no-unused-vars": "warn",
        "@next/next/no-html-link-for-pages": "warn",
        "react/no-unescaped-entities": "warn",
        "react/jsx-key": "warn",
    },
};
