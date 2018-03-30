import * as fs from "fs";

const FILENAME_JS = "src/utils/Colors.ts";
const FILENAME_LESS = "src/less/colors.less";

const FILE_HEADER =
`/**
 * ====  NOTE: Auto-generated file. Do NOT edit directly! ====
 * ====  Edit genColors.ts instead and run make generate. ====
 *
 * Standard color variables.
 */`;

const Colors = {
  // Primary colors:
  Primary: {
    PRIMARY_BLUE: "#4274f6",
    PRIMARY_BLUE_SHADE_1: "#3863d1",
    PRIMARY_BLUE_SHADE_2: "#2e51ac",
    PRIMARY_BLUE_TINT_1: "#5e89f7",
    PRIMARY_BLUE_TINT_2: "#7b9ef9",
  },

  // Neutral colors:
  Neutral: {
    NEUTRAL_BLACK: "#191926",
    NEUTRAL_DARK_GRAY: "#566279",
    NEUTRAL_GRAY: "#b5bcca",
    NEUTRAL_SILVER: "#e3e6eb",
    NEUTRAL_OFF_WHITE: "#fafafc",
    NEUTRAL_WHITE: "#fff",
  },

  // Alert colors:
  Alert: {
    ALERT_GREEN: "#01d59a",
    ALERT_GREEN_SHADE_1: "#01b583",
    ALERT_GREEN_SHADE_2: "#01956c",
    ALERT_GREEN_TINT_1: "#27dba9",
    ALERT_GREEN_TINT_2: "#4de2b8",

    ALERT_ORANGE: "#fca53a",
    ALERT_ORANGE_SHADE_1: "#d68c31",
    ALERT_ORANGE_SHADE_2: "#b07329",
    ALERT_ORANGE_TINT_1: "#fcb358",
    ALERT_ORANGE_TINT_2: "#fdc075",

    ALERT_RED: "#eb3b49",
    ALERT_RED_SHADE_1: "#c8323e",
    ALERT_RED_SHADE_2: "#a52933",
    ALERT_RED_TINT_1: "#ee5864",
    ALERT_RED_TINT_2: "#f17680",
  },

  // Secondary colors:
  Accent: {
    ACCENT_TEAL: "#33f7f1",
    ACCENT_TEAL_SHADE_1: "#2bd2cd",
    ACCENT_TEAL_SHADE_2: "#24ada9",
    ACCENT_TEAL_TINT_1: "#52f8f3",
    ACCENT_TEAL_TINT_2: "#70f9f5",

    ACCENT_PINK: "#e838bf",
    ACCENT_PINK_SHADE_1: "#c530a2",
    ACCENT_PINK_SHADE_2: "#a22786",
    ACCENT_PINK_TINT_1: "#eb56c9",
    ACCENT_PINK_TINT_2: "#ef74d2",

    ACCENT_PURPLE: "#7e1dff",
    ACCENT_PURPLE_SHADE_1: "#6b19d9",
    ACCENT_PURPLE_SHADE_2: "#5814b3",
    ACCENT_PURPLE_TINT_1: "#913fff",
    ACCENT_PURPLE_TINT_2: "#a561ff",
  },
};

const DeprecatedColors = {
  ACCENT_AQUA: Colors.Accent.ACCENT_TEAL,
};

const jsColors = [];
const lessColors = [];

Object.keys(Colors).forEach(category => {
  jsColors.push(`  // ${category} colors:`);
  lessColors.push(`// ${category} colors:`);

  Object.keys(Colors[category]).forEach(colorName => {
    const colorValue = Colors[category][colorName];
    jsColors.push(`  ${colorName}: "${colorValue}",`);
    lessColors.push(`@${colorName.toLowerCase()}: ${colorValue};`);
  });

  jsColors.push("");
  lessColors.push("");
});

jsColors.push("  // DEPRECATED COLORS:");
lessColors.push("// DEPRECATED COLORS:");

Object.keys(DeprecatedColors).forEach(colorName => {
  const colorValue = DeprecatedColors[colorName];
  jsColors.push(`  ${colorName}: "${colorValue}",`);
  lessColors.push(`@${colorName.toLowerCase()}: ${colorValue};`);
});

const jsContents = [
  FILE_HEADER,
  "",
  "const Colors = {",
  ...jsColors,
  "};",
  "",
  "export default Colors;",
  "",
];
fs.writeFileSync(`${FILENAME_JS}`, jsContents.join("\n"));

const DEPRECATED_LESS_HELPERS =
`// DEPRECATED: Use pre-defined tints and shades above instead.
@shadeStepAmount: 15%;
.shade(@property, @color, @steps: 1) {
  @{property}: shade(@color, @shadeStepAmount * @steps);
}
.tint(@property, @color, @steps: 1) {
  @{property}: tint(@color, @shadeStepAmount * @steps);
}`;

const lessContents = [
  FILE_HEADER,
  "",
  ...lessColors,
  "",
  DEPRECATED_LESS_HELPERS,
  "",
];
fs.writeFileSync(`${FILENAME_LESS}`, lessContents.join("\n"));
