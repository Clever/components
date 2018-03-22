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
    PRIMARY_BLUE: "#2e00d9",
    PRIMARY_BLUE_SHADE_1: "#0500b0",
    PRIMARY_BLUE_SHADE_2: "#000087",
    PRIMARY_BLUE_TINT_1: "#3e14fa",
    PRIMARY_BLUE_TINT_2: "#473dff",
  },

  // Neutral colors:
  Neutral: {
    NEUTRAL_BLACK: "#15131c",
    NEUTRAL_DARK_GRAY: "#474c5e",
    NEUTRAL_GRAY: "#71738a",
    NEUTRAL_SILVER: "#d6d7de",
    NEUTRAL_OFF_WHITE: "#fbfafc",
    NEUTRAL_WHITE: "#ffffff",
  },

  // Alert colors:
  Alert: {
    ALERT_GREEN: "#009e78",
    ALERT_GREEN_SHADE_1: "#00754f",
    ALERT_GREEN_SHADE_2: "#004c26",
    ALERT_GREEN_TINT_1: "#14b28c",
    ALERT_GREEN_TINT_2: "#3ddbb5",

    ALERT_ORANGE: "#ed8a00",
    ALERT_ORANGE_SHADE_1: "#d97600",
    ALERT_ORANGE_SHADE_2: "#b04d00",
    ALERT_ORANGE_TINT_1: "#ff9e14",
    ALERT_ORANGE_TINT_2: "#ffc73d",

    ALERT_RED: "#de004b",
    ALERT_RED_SHADE_1: "#ca0037",
    ALERT_RED_SHADE_2: "#a1000e",
    ALERT_RED_TINT_1: "#f51152",
    ALERT_RED_TINT_2: "#ff4268",
  },

  // Secondary colors:
  Accent: {
    ACCENT_TEAL: "#00c7c7",
    ACCENT_TEAL_SHADE_1: "#00b3b3",
    ACCENT_TEAL_SHADE_2: "#008a8a",
    ACCENT_TEAL_TINT_1: "#14dbdb",
    ACCENT_TEAL_TINT_2: "#29f0f0",

    ACCENT_PINK: "#f70099",
    ACCENT_PINK_SHADE_1: "#e30085",
    ACCENT_PINK_SHADE_2: "#ba005c",
    ACCENT_PINK_TINT_1: "#ff29ae",
    ACCENT_PINK_TINT_2: "#ff52ce",

    ACCENT_PURPLE: "#8000ff",
    ACCENT_PURPLE_SHADE_1: "#6c00eb",
    ACCENT_PURPLE_SHADE_2: "#4e00c2",
    ACCENT_PURPLE_TINT_1: "#9414ff",
    ACCENT_PURPLE_TINT_2: "#bd3dff",
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
