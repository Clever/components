module.exports = {
  rules: {
    "block-no-empty": null,
    "block-opening-brace-space-before": "always",
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always-single-line",
    "declaration-empty-line-before": "never",
    "declaration-property-value-whitelist": [
      {
        "/color/": [
          "/@neutral_white/",
          "/@neutral_off_white/",
          "/@neutral_silver/",
          "/@neutral_gray/",
          "/@neutral_dark_gray/",
          "/@neutral_black/",
          "/@primary_blue/",
          "/@primary_blue_shade_1/",
          "/@primary_blue_shade_2/",
          "/@primary_blue_tint_1/",
          "/@primary_blue_tint_2/",
          "/@alert_green/",
          "/@alert_green_shade_1/",
          "/@alert_green_shade_2/",
          "/@alert_green_tint_1/",
          "/@alert_green_tint_2/",
          "/@alert_red/",
          "/@alert_red_shade_1/",
          "/@alert_red_shade_2/",
          "/@alert_red_tint_1/",
          "/@alert_red_tint_2/",
          "/@alert_orange/",
          "/@alert_orange_shade_1/",
          "/@alert_orange_shade_2/",
          "/@alert_orange_tint_1/",
          "/@alert_orange_tint_2/",
          "/@accent_aqua/",
          "/@accent_teal/",
          "/@accent_teal_shade_1/",
          "/@accent_teal_shade_2/",
          "/@accent_teal_tint_1/",
          "/@accent_teal_tint_2/",
          "/@accent_purple/",
          "/@accent_purple_shade_1/",
          "/@accent_purple_shade_2/",
          "/@accent_purple_tint_1/",
          "/@accent_purple_tint_2/",
          "/@accent_pink/",
          "transparent",
        ],
      },
    ],
    "max-empty-lines": 2,
    "max-line-length": 100,
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
