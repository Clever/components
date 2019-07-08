var tsc = require("typescript");
var tsConfig = require("./tsconfig.json");

// Transforms jsx files for React testing via Jest.
module.exports = {
  process: (src, filename) => {
    // Ignore vendored files.
    if (filename.match(/node_modules/)) {
      return src;
    }

    let processedSrc = src;

    // Convert to ES5.
    processedSrc = tsc.transpileModule(processedSrc, {
      compilerOptions: Object.assign({}, tsConfig.compilerOptions, {
        jsx: tsc.JsxEmit.React,
      }),
      fileName: filename,
      reportDiagnostics: true,
    }).outputText;

    return processedSrc;
  },
};
