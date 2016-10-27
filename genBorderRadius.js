const _ = require("lodash");
const fs = require("fs");


const FILEPATH = "src/less/";
const FILENAME = "border_radius.less";
const borderRadii = {
  0: 0,
  s: 0.125, // 2px
  m: 0.1875, // 3px
};

const constants = [];
let classes = [];

_.forEach(borderRadii, (radius, name) => {
  // Trim leading 0s on fractional radiuss.
  const radiusStr = `${radius}`.replace("0.", ".");
  const radiusVar = `@borderRadius${name.toUpperCase()}`;
  constants.push(`${radiusVar}: ${radiusStr}rem;  /* ${radius * 16}px */`);

  classes = classes.concat([
    "",

    `/** ${radiusVar} */`,

    `.borderRadius--${name} { border-radius: ${radiusVar}; }`,

    `.borderRadius--topLeft--${name} { border-top-left-radius: ${radiusVar}; }`,

    `.borderRadius--topRight--${name} { border-top-right-radius: ${radiusVar}; }`,

    `.borderRadius--bottomLeft--${name} { border-bottom-left-radius: ${radiusVar}; }`,

    `.borderRadius--bottomRight--${name} { border-bottom-right-radius: ${radiusVar}; }`,

    `.borderRadius--top--${name} { .borderRadius--topLeft--${name}; .borderRadius--topRight--${name}; }`,

    `.borderRadius--bottom--${name} { .borderRadius--bottomLeft--${name}; .borderRadius--bottomRight--${name}; }`,
  ]);
});

const contents = [
  "/**",
  " * Common border-radius definitions.",
  " *",
  " * Auto-generated file.",
  " * To re-generate, run `make border-radius-styles`",
  " */",
  "",
].concat(
  [
    "/**",
    " * Border radius constants.",
    " */",
  ],
  constants,
  "",
  [
    "",
    "/**",
    " * Border radius classes.",
    " */",
  ],
  classes,
  ""
);
fs.writeFileSync(`${FILEPATH}${FILENAME}`, contents.join("\n"));
