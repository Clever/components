import {createNewComponentDemo} from "./componentUtils";

const [, , componentName] = process.argv;
try {
  createNewComponentDemo((componentName || "").trim());
} catch (e) {
  console.error("\n❌  Unable to create new component demo:", e);
}
