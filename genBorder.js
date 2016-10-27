// TODO: Consider generating border classes as well that would just assign a default @neutral_silver
// color. We need to be sure it would actually be useful before adding the extra CSS bloat.
const _ = require("lodash");
const fs = require("fs");


const FILEPATH = "src/less/";
const FILENAME = "border.less";
const borderWidths = {
  s: 0.0625, // 1px
  m: 0.125, // 2px
  l: 0.1875, // 3px
};

const constants = [];
let mixins = [];

_.forEach(borderWidths, (width, name) => {
  // Trim leading 0s on fractional widths.
  const widthStr = `${width}`.replace("0.", ".");
  const widthVar = `@borderWidth${name.toUpperCase()}`;
  constants.push(`${widthVar}: ${widthStr}rem;  /* ${width * 16}px */`);

  mixins = mixins.concat([
    "",

    `/** ${widthVar} */`,

    `.border--${name}(@color) { border: ${widthVar} solid @color; }`,

    `.border--top--${name}(@color) { border-top: ${widthVar} solid @color; }`,

    `.border--right--${name}(@color) { border-right: ${widthVar} solid @color; }`,

    `.border--bottom--${name}(@color) { border-bottom: ${widthVar} solid @color; }`,

    `.border--left--${name}(@color) { border-left: ${widthVar} solid @color; }`,

    `.border--x--${name}(@color) { .border--left--${name}(@color); .border--right--${name}(@color); }`,

    `.border--y--${name}(@color) { .border--top--${name}(@color); .border--bottom--${name}(@color); }`,
  ]);
});

const contents = [
  "/**",
  " * Common border definitions.",
  " *",
  " * Auto-generated file.",
  " * To re-generate, run `make border-styles`",
  " */",
  "",
].concat(
  [
    "/**",
    " * Border width constants.",
    " */",
  ],
  constants,
  "",
  [
    "",
    "/**",
    " * Border mixins.",
    " */",
  ],
  mixins,
  ""
);
fs.writeFileSync(`${FILEPATH}${FILENAME}`, contents.join("\n"));
