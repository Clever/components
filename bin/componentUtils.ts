import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";

const COMPONENT_NAME_PLACEHOLDER = "NewComponent";
const COMPONENT_NAME_PLACEHOLDER_REGEX = /NewComponent/g;
const DEMO_COMPONENTS_DIR_PATH = getAbsoluteFilePath("docs/components");

export function createNewComponent(componentName) {
  requireArg("component name", componentName);

  console.log("");
  console.log(`Creating ${componentName}:`);
  console.log("==========================");
  console.log("");

  process.stdout.write(`Creating src/${componentName} folder...`);
  const srcDirPath = getAbsoluteFilePath(`src/${componentName}`);
  if (!fs.existsSync(srcDirPath)) {
    fs.mkdirSync(srcDirPath);
    process.stdout.write("✅\n");
  } else {
    process.stdout.write(`⚠️  already exists - component will be overwritten.\n`);
  }

  createNewSubComponent(componentName, srcDirPath);

  const componentIndexFilePath = `${srcDirPath}/index.ts`;
  fs.writeFileSync(
    componentIndexFilePath,
    [
      `import ${componentName} from "./${componentName}";`,
      `export default ${componentName};`,
      "",
    ].join("\n"),
  );

  process.stdout.write("Updating src/index.js...");

  const srcIndexFilePath = getAbsoluteFilePath("src/index.js");
  let indexFileContents = readFileContents(srcIndexFilePath);
  if (!indexFileContents.includes(componentName)) {
    indexFileContents = [
      indexFileContents,
      `import ${componentName} from "./${componentName}";`,
      `export {${componentName}};`,
      "",
    ].join("\n");

    fs.writeFileSync(srcIndexFilePath, indexFileContents);
  }

  process.stdout.write("✅\n");

  createNewComponentDemo(componentName);

  console.log(`\n${componentName} successfully created!\n`);
  console.log(
    `🔗  View demo at http://localhost:5010/#/components/${_.kebabCase(componentName)} 🔗`,
  );
  console.log("(You might need to run make dev-server if you haven't already)\n");
}

export function createNewSubComponent(componentName, directoryPath) {
  process.stdout.write(`Creating ${componentName} component and test files...`);

  requireArg("component name", componentName);
  requireArg("directory path", directoryPath);

  let absoluteDirPath = directoryPath;
  if (!path.isAbsolute(absoluteDirPath)) {
    absoluteDirPath = getAbsoluteFilePath(absoluteDirPath);
  }

  const componentClass = renderTemplate(`${COMPONENT_NAME_PLACEHOLDER}.tsx`, componentName);
  fs.writeFileSync(`${absoluteDirPath}/${componentName}.tsx`, componentClass);

  const componentStyles = renderTemplate(`${COMPONENT_NAME_PLACEHOLDER}.less`, componentName);
  fs.writeFileSync(`${absoluteDirPath}/${componentName}.less`, componentStyles);

  const componentTest = renderTemplate(`${COMPONENT_NAME_PLACEHOLDER}_test.tsx`, componentName);
  fs.writeFileSync(`${absoluteDirPath}/${componentName}_test.tsx`, componentTest);

  process.stdout.write("✅\n");
}

export function createNewComponentDemo(componentName) {
  process.stdout.write(`Creating ${componentName} demo component...`);

  requireArg("component name", componentName);

  const componentDemoClass = renderTemplate(`${COMPONENT_NAME_PLACEHOLDER}View.tsx`, componentName);
  // TODO: Figure out how to get fish's magic babel transform working for tsx compilation so we can
  // generate .tsx for this.
  fs.writeFileSync(`${DEMO_COMPONENTS_DIR_PATH}/${componentName}View.jsx`, componentDemoClass);

  const componentDemoStyles = renderTemplate(
    `${COMPONENT_NAME_PLACEHOLDER}View.less`,
    componentName,
  );
  fs.writeFileSync(`${DEMO_COMPONENTS_DIR_PATH}/${componentName}View.less`, componentDemoStyles);

  // Update router:
  const componentRoutePath = _.kebabCase(componentName);
  const routerFilePath = getAbsoluteFilePath("docs/docs.jsx");
  const routerFileContents = readFileContents(routerFilePath);

  const importsRegex = /\n\n((\n?import.+;)+)/;
  const imports = new Set(routerFileContents.match(importsRegex)[1].split("\n"));
  imports.add(`import ${componentName}View from "./components/${componentName}View";`);

  const routesRegex = /<Route path="components">\n((\n?\s+<Route.+\/>)+)\n\s+<\/Route>/;
  const routes = new Set(routerFileContents.match(routesRegex)[1].split("\n"));
  routes.add(
    `        <Route path="${componentRoutePath}(/*)" component={${componentName}View} />`,
  );

  const updatedRouterFileContents = routerFileContents
    .replace(
      importsRegex,
      `\n\n${Array.from(imports)
        .sort()
        .join("\n")}`,
    )
    .replace(
      routesRegex,
      `<Route path="components">\n${Array.from(routes)
        .sort()
        .join("\n")}\n      </Route>`,
    );
  fs.writeFileSync(routerFilePath, updatedRouterFileContents);

  // Update sidebar links:
  const sidebarFilePath = getAbsoluteFilePath("docs/components/SideBar/SideBar.jsx");
  const sidebarFileContents = readFileContents(sidebarFilePath);

  const linksRegex =
    /(<NavGroup id="components".+>)\n((\n?\s+{this._renderLink.+})+)\n\s+<\/NavGroup>/;
  const links = new Set(sidebarFileContents.match(linksRegex)[2].split("\n"));
  links.add(
    `          {this._renderLink("/components/${componentRoutePath}", "${componentName}")}`,
  );

  const updatedSidebarFileContents = sidebarFileContents.replace(
    linksRegex,
    `$1\n${Array.from(links)
      .sort()
      .join("\n")}\n        </NavGroup>`,
  );
  fs.writeFileSync(sidebarFilePath, updatedSidebarFileContents);

  process.stdout.write("✅\n");
}

function renderTemplate(templateFileName, componentName) {
  const fileContents = readFileContents(getAbsoluteFilePath(`bin/${templateFileName}`));
  return fileContents.replace(COMPONENT_NAME_PLACEHOLDER_REGEX, componentName);
}

function readFileContents(filePath) {
  return fs.readFileSync(`${filePath}`, "utf8");
}

function getAbsoluteFilePath(projectRelativeFilePath) {
  return path.resolve(`${__dirname}/../${projectRelativeFilePath}`);
}

function requireArg(name, value) {
  if (!value || !value.trim()) {
    throw new Error(`${name} is required`);
  }
}
