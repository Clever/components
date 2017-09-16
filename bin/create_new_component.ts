import {createNewComponent} from "./componentUtils";

const [, , componentName] = process.argv;
try {
  createNewComponent((componentName || "").trim());
} catch (e) {
  console.error("\n❌  Unable to create new component:", e);
}
