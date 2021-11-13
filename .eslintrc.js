module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true,
    },
    extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "ts": "never",
                "js": "never",
            }
        ],
        "max-len": [
            "error",
            {
                ignoreComments: true,
                code: 120,
            },
        ],
        "no-continue": "off",
        "no-param-reassign":["error", {"props": false},]
    },
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [".ts", ".js"],
            }
        }
    },
    plugins: ["jest"],
};
