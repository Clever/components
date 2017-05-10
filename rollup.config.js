import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import less from "rollup-plugin-less";

if (["es", "cjs"].indexOf(process.env.OUTPUT_BUILD) === -1) {
  throw new Error("Env var `OUTPUT_BUILD` must be one of ['es', 'cjs']");
}

export default {
  entry: "src/index.ts",
  dest: `dist/index.${process.env.OUTPUT_BUILD}.js`,
  format: process.env.OUTPUT_BUILD,
  sourceMap: "inline",
  plugins: [
    less(),
    typescript(),
    commonjs(), // allows requiring module.exports-style code
  ],
};
