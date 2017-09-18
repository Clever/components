import {createNewSubComponent} from "./componentUtils";

const [, , componentName, directoryPath] = process.argv;
try {
  createNewSubComponent((componentName || "").trim(), (directoryPath || "").trim());
} catch (e) {
  console.error("\n❌  Unable to create new sub-component:", e);
}

