const _ = require("lodash");
const fs = require("fs");


const FILEPATH = "src/less/";
const SIZING_FILENAME = "sizing.less";
const SPACING_FILENAME = "spacing.less";
const sizes = {
  none: 0,
  "3xs": 0.125,
  "2xs": 0.25,
  xs: 0.5,
  s: 0.75,
  m: 1,
  l: 1.5,
  xl: 2,
  "2xl": 2.5,
  "3xl": 3,
  "4xl": 3.5,
  "5xl": 4,
};

let sizingContents = [];
let spacingContents = [];

_.forEach(sizes, (size, sizeName) => {
  // Trim leading 0s on fractional sizes.
  const sizeStr = `${size}`.replace("0.", ".");

  const sizeVar = `@size_${sizeName}`;
  sizingContents.push(`${sizeVar}: ${sizeStr}rem;  /* ${size * 16}px */`);

  spacingContents.push("/**");
  spacingContents.push(` * ${sizeVar}`);
  spacingContents.push(" */");

  ["margin", "padding"].forEach(type => {
    const classPrefix = `${type}`;
    spacingContents = spacingContents.concat([
      `.${classPrefix}--${sizeName} { ${type}: ${sizeVar} };`,

      `.${classPrefix}--top--${sizeName} { ${type}-top: ${sizeVar} };`,

      `.${classPrefix}--right--${sizeName} { ${type}-right: ${sizeVar} };`,

      `.${classPrefix}--bottom--${sizeName} { ${type}-bottom: ${sizeVar} };`,

      `.${classPrefix}--left--${sizeName} { ${type}-left: ${sizeVar} };`,

      `.${classPrefix}--x--${sizeName} { ${type}-left: ${sizeVar}; ${type}-right: ${sizeVar} };`,

      `.${classPrefix}--y--${sizeName} { ${type}-top: ${sizeVar}; ${type}-bottom: ${sizeVar} };`,
    ]);

    spacingContents.push("");
  });
});
sizingContents.push("");

sizingContents = [
  "/**",
  " * Common sizing definitions.",
  " *",
  " * Auto-generated file.",
  " * To re-generate, run `make sizing-styles`",
  " */",
  "",
].concat(sizingContents);
fs.writeFileSync(`${FILEPATH}${SIZING_FILENAME}`, sizingContents.join("\n"));

spacingContents = [
  "/**",
  " * Common spacing definitions.",
  " *",
  " * Auto-generated file.",
  " * To re-generate, run `make sizing-styles`",
  " */",
  `@import (reference) "./${SIZING_FILENAME}";`,
  "",
].concat(spacingContents);
fs.writeFileSync(`${FILEPATH}${SPACING_FILENAME}`, spacingContents.join("\n"));
