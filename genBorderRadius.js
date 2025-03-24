const _ = require("lodash");
const fs = require("fs");

const FILEPATH = "src/less/";
const FILENAME = "border_radius.less";

const borderRadii = {
  0: 0,
  s: 0.125, // 2px
  m: 0.1875, // 3px
  l: 0.25, // 4px
  xl: 0.5, // 8px
  "10percent": "10%",
};

const CIRCLE_MIXIN = `
.circle(@width) {
  border-radius: 50%;
  height: @width;
  width: @width;
}
`;

const constants = [];
let classes = [];

_.forEach(borderRadii, (radius, name) => {
  // Trim leading 0s on fractional radiuss.
  let radiusVar = `@borderRadius${name.toUpperCase()}`;
  const radiusStr = `${radius}`.replace("0.", ".");
  if (`${radius}`.endsWith("%")) {
    radiusVar = `@borderRadius${name}`;
    constants.push(`${radiusVar}: ${radius};  /* ${radius} */`);
  } else {
    constants.push(`${radiusVar}: ${radiusStr}rem;  /* ${radius * 16}px */`);
  }

  classes = classes.concat([
    "",

    `/** ${radiusVar} */`,

    `.borderRadius--${name} { border-radius: ${radiusVar}; }\n`,

    `.borderRadius--topLeft--${name} { border-top-left-radius: ${radiusVar}; }\n`,

    `.borderRadius--topRight--${name} { border-top-right-radius: ${radiusVar}; }\n`,

    `.borderRadius--bottomLeft--${name} { border-bottom-left-radius: ${radiusVar}; }\n`,

    `.borderRadius--bottomRight--${name} { border-bottom-right-radius: ${radiusVar}; }\n`,

    `.borderRadius--top--${name} { .borderRadius--topLeft--${name}; .borderRadius--topRight--${name}; }\n`,

    `.borderRadius--bottom--${name} { .borderRadius--bottomLeft--${name}; .borderRadius--bottomRight--${name}; }\n`,

    `.borderRadius--left--${name} { .borderRadius--topLeft--${name}; .borderRadius--bottomLeft--${name}; }\n`,

    `.borderRadius--right--${name} { .borderRadius--topRight--${name}; .borderRadius--bottomRight--${name}; }`,
  ]);
});

const contents = [
  "// stylelint-disable max-line-length",
  "",
  "/**",
  " * Common border-radius definitions.",
  " *",
  " * Auto-generated file.",
  " * To re-generate, run `make border-radius-styles`",
  " */",
  "",
].concat(
  ["/**", " * Border radius constants.", " */"],
  constants,
  "",
  ["", "/**", " * Border radius classes.", " */", CIRCLE_MIXIN],
  classes,
  "",
);
fs.writeFileSync(`${FILEPATH}${FILENAME}`, contents.join("\n"));
