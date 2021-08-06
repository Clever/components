import * as fs from "fs";

const FILENAME_JS = "src/utils/Colors.ts";
const FILENAME_LESS = "src/less/colors.less";

const FILE_HEADER = `/**
 * ====  NOTE: Auto-generated file. Do NOT edit directly! ====
 * ====  Edit genColors.ts instead and run make generate. ====
 *
 * Standard color variables.
 */`;

const Colors = {
  // Primary colors:
  Primary: {
    PRIMARY_BLUE: "#436CF2",
    PRIMARY_BLUE_SHADE_1: "#3158D7",
    PRIMARY_BLUE_SHADE_2: "#2146BD",
    PRIMARY_BLUE_SHADE_3: "#16328D",
    PRIMARY_BLUE_TINT_1: "#6486F8",
    PRIMARY_BLUE_TINT_2: "#809DFF",
  },

  // Neutral colors:
  Neutral: {
    NEUTRAL_BLACK: "#15131C",
    NEUTRAL_DARK_GRAY: "#474C5E",
    NEUTRAL_MEDIUM_GRAY: "#686F88",
    NEUTRAL_GRAY: "#A8AEBA",
    NEUTRAL_SILVER: "#e3e6eb",
    NEUTRAL_OFF_WHITE: "#FAFBFC",
    NEUTRAL_WHITE: "#fff",
  },

  // Alert colors:
  Alert: {
    ALERT_GREEN: "#1DA978",
    ALERT_GREEN_SHADE_1: "#139668",
    ALERT_GREEN_SHADE_2: "#018657",
    ALERT_GREEN_TINT_1: "#2dBE8B",
    ALERT_GREEN_TINT_2: "#49D2A2",

    ALERT_ORANGE: "#F59520",
    ALERT_ORANGE_SHADE_1: "#F78214",
    ALERT_ORANGE_SHADE_2: "#EE7503",
    ALERT_ORANGE_TINT_1: "#FAAA35",
    ALERT_ORANGE_TINT_2: "#FBC553",

    ALERT_RED: "#E02B3A",
    ALERT_RED_SHADE_1: "#C6212E",
    ALERT_RED_SHADE_2: "#AE121F",
    ALERT_RED_TINT_1: "#ED4B59",
    ALERT_RED_TINT_2: "#F56A75",
    ALERT_RED_SHADE: "#B30C10",
  },

  // Secondary colors:
  Accent: {
    ACCENT_TEAL: "#29C6C1",
    ACCENT_TEAL_SHADE_1: "#1CB0AB",
    ACCENT_TEAL_SHADE_2: "#119792",
    ACCENT_TEAL_TINT_1: "#44D7D2",
    ACCENT_TEAL_TINT_2: "#7FE5E2",

    ACCENT_PINK: "#F03797",
    ACCENT_PINK_SHADE_1: "#D3257F",
    ACCENT_PINK_SHADE_2: "#B31969",
    ACCENT_PINK_TINT_1: "#FB57AC",
    ACCENT_PINK_TINT_2: "#FF75BD",

    ACCENT_PURPLE: "#7e1dff",
    ACCENT_PURPLE_SHADE_1: "#6609E0",
    ACCENT_PURPLE_SHADE_2: "#5201BF",
    ACCENT_PURPLE_TINT_1: "#9244FA",
    ACCENT_PURPLE_TINT_2: "#A460FF",
  },

  // TODO: Is it kosher to add this here?
  // copied from family-portal-mobile/FamilyPortalMobile/src/ui-styles/colors.ts
  FamilyPortalMobile: {
    FAMILY_PORTAL_MOBILE_SLATE: "#32315B",
  },
};

const DeprecatedColors = {
  ACCENT_AQUA: Colors.Accent.ACCENT_TEAL,
};

const jsColors = [];
const lessColors = [];

Object.keys(Colors).forEach((category) => {
  jsColors.push(`  // ${category} colors:`);
  lessColors.push(`// ${category} colors:`);

  Object.keys(Colors[category]).forEach((colorName) => {
    const colorValue = Colors[category][colorName];
    jsColors.push(`  ${colorName}: "${colorValue}",`);
    lessColors.push(`@${colorName.toLowerCase()}: ${colorValue};`);
  });

  jsColors.push("");
  lessColors.push("");
});

jsColors.push("  // DEPRECATED COLORS:");
lessColors.push("// DEPRECATED COLORS:");

Object.keys(DeprecatedColors).forEach((colorName) => {
  const colorValue = DeprecatedColors[colorName];
  jsColors.push(`  ${colorName}: "${colorValue}",`);
  lessColors.push(`@${colorName.toLowerCase()}: ${colorValue};`);
});

const jsContents = [
  FILE_HEADER,
  "",
  "const Colors = {",
  ...jsColors,
  "} as const;",
  "",
  "export default Colors;",
  "",
];
fs.writeFileSync(`${FILENAME_JS}`, jsContents.join("\n"));

const DEPRECATED_LESS_HELPERS = `// DEPRECATED: Use pre-defined tints and shades above instead.
@shadeStepAmount: 15%;
.shade(@property, @color, @steps: 1) {
  @{property}: shade(@color, @shadeStepAmount * @steps);
}
.tint(@property, @color, @steps: 1) {
  @{property}: tint(@color, @shadeStepAmount * @steps);
}`;

const lessContents = [FILE_HEADER, "", ...lessColors, "", DEPRECATED_LESS_HELPERS, ""];
fs.writeFileSync(`${FILENAME_LESS}`, lessContents.join("\n"));
