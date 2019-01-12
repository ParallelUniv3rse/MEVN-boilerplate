module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['plugin:vue/strongly-recommended', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow async-await
    'generator-star-spacing': 0,
    "indent": [2, 2, {"SwitchCase": 1, "VariableDeclarator": 1}],
    "one-var": "off",
    "max-len": "off",
    "no-underscore-dangle": "off",
    'comma-dangle': ['error', 'always-multiline'],
    "global-require":"off",
    "import/no-extraneous-dependencies": "off",
    "class-methods-use-this": "off",
    "object-curly-spacing": 0,
    "no-else-return": "off",
    "no-shadow": "off",
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement"
    ],
    "no-param-reassign": "off",
    "import/no-dynamic-require": "off",
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off",
        "vue/script-indent": ["error", 2, {
          "baseIndent": 1,
          "SwitchCase": 1
        }],
      }
    }
  ]

};
