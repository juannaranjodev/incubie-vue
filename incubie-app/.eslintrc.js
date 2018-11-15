module.exports = {
  "root": true,

  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "globals": {
    "$createLink": true
  },
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": 0,

    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never"
      }
    ],
    "vue/order-in-components": [
      "error",
      {
        "order": [
          "el",
          "name",
          "parent",
          "functional",
          [
            "delimiters",
            "comments"
          ],
          [
            "components",
            "directives",
            "filters"
          ],
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          [
            "props",
            "propsData"
          ],
          "data",
          "computed",
          "watch",
          "LIFECYCLE_HOOKS",
          "methods",
          [
            "template",
            "render"
          ],
          "renderError"
        ]
      }
    ]
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
    "prettier"
  ],
  "plugins": [
    "vue",
    "prettier"
  ]
}