module.exports = {
  rules: {
    "block-no-empty": null,
    "block-opening-brace-space-before": "always",
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always-single-line",
    "declaration-empty-line-before": "never",
    "declaration-property-value-whitelist": [
      {
        "/color/": ["/@.+/", "transparent"],
      },
    ],
    "max-empty-lines": 2,
    "max-nesting-depth": [
      2,
      {
        ignoreAtRules: ["media"],
      },
    ],
    "no-descending-specificity": true,
    "no-duplicate-selectors": true,
    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "selector-max-id": 0,
    "value-list-comma-space-after": "always-single-line",
    "value-list-comma-newline-after": "always-multi-line",
    "unit-whitelist": ["em", "rem", "%", "s", "vh", "vw", "ms", "turn", "deg"],
  },
};
