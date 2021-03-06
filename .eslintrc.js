module.exports = {
  root: true,
  "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "standard"
    ],
    "env": {
        "jest": true
    },
    "plugins": [
        "flowtype-errors",
        "react",
        "react-native"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 0,
        "flowtype-errors/show-errors": 2,
        "react/prop-types": 0,
        "no-console": 0,
        "react/sort-comp": 2,
        "react/no-string-refs": 0,
        "no-undef": 0,
        "indent": [
            2,
            2
        ],
        "template-tag-spacing": ["error", "never"]
    },
    "globals": {
        "fetch": true,
        "enquire": true,
        "FontFaceObserver": true,
        "imagesloaded": true,
        "Modernizr": true
    }
}
