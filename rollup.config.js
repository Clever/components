import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

if (["es", "cjs"].indexOf(process.env.OUTPUT_BUILD) === -1) {
  throw new Error("Env var `OUTPUT_BUILD` must be one of ['es', 'cjs']");
}

function ignoreExtensions(list) {
  return {
    name: "ignoreExtensions",
    load: id => {
      for (const suffix of list) {
        if (id.endsWith(suffix)) {
          return "export default {}";
        }
      }

      return null;
    },
  };
}
export default {
  entry: "src/index.ts",
  dest: `dist/index.${process.env.OUTPUT_BUILD}.js`,
  format: process.env.OUTPUT_BUILD,
  sourceMap: "inline",
  external: ["react", "moment"],
  plugins: [
    ignoreExtensions([".less", ".css"]),
    typescript(),
    commonjs(), // allows requiring module.exports-style code
  ],
};
