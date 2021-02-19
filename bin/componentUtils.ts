import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import * as recast from "recast";
import * as astTypes from "ast-types";

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
    process.stdout.write("⚠️  already exists - component will be overwritten.\n");
  }

  createNewSubComponent(componentName, srcDirPath);

  const componentIndexFilePath = `${srcDirPath}/index.ts`;
  fs.writeFileSync(
    componentIndexFilePath,
    [`export { ${componentName} } from "./${componentName}";`, ""].join("\n"),
  );

  process.stdout.write("Updating src/index.ts...");

  const srcIndexFilePath = getAbsoluteFilePath("src/index.ts");
  let indexFileContents = readFileContents(srcIndexFilePath);
  if (!indexFileContents.includes(`export { ${componentName} }`)) {
    indexFileContents = [
      indexFileContents,
      `export { ${componentName} } from "./${componentName}";`,
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

  const routesRegex = /(<Route\s*path="components"[\s\S]*\}\}\n\s*>\n)((\n?\s+<Route.+\/>)+)\n\s+<\/Route>/;
  const routesMatches = routerFileContents.match(routesRegex);
  const routeParent = routesMatches[1];
  const routes = new Set(routesMatches[2].split("\n"));
  routes.add(`        <Route path="${componentRoutePath}(/*)" component={${componentName}View} />`);

  const updatedRouterFileContents = routerFileContents
    .replace(importsRegex, `\n\n${Array.from(imports).sort().join("\n")}`)
    .replace(routesRegex, `${routeParent}${Array.from(routes).sort().join("\n")}\n      </Route>`);
  fs.writeFileSync(routerFilePath, updatedRouterFileContents);

  // Update sidebar links:
  const sidebarFilePath = getAbsoluteFilePath("docs/components/SideBar/SideBar.jsx");
  const sidebarFileContents = readFileContents(sidebarFilePath);

  // use some AST transformations to insert the sidebar link
  // tutorials:
  // https://github.com/benjamn/ast-types
  // https://github.com/benjamn/recast
  // informative babel documentation (slightly different library):
  // https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
  // example AST here https://astexplorer.net/#/gist/3fc672d80a6e82fa02103ad43fcddfbe/204ff6161580db41d958fd94bf050e04fba5acc6
  const ast = recast.parse(sidebarFileContents);
  astTypes.visit(ast, {
    visitJSXElement(nodePath) {
      const node = nodePath.node;
      const nt = astTypes.namedTypes;
      if (
        // only run this code once we have traversed to the specific NavGroup jsx element
        nt.JSXIdentifier.check(node.openingElement.name) &&
        node.openingElement.name.name === "NavGroup" &&
        node.openingElement.attributes.find(
          (n) =>
            nt.JSXAttribute.check(n) &&
            n.name.name === "id" &&
            nt.Literal.check(n.value) &&
            n.value.value === "components",
        )
      ) {
        const b = astTypes.builders;
        // create an AST that represents the code we want to insert
        const newLinkAST = b.jsxExpressionContainer(
          b.callExpression(b.memberExpression(b.thisExpression(), b.identifier("_renderLink")), [
            b.literal(`/components/${componentRoutePath}`),
            b.literal(componentName),
          ]),
        );
        const newlineAST = b.jsxText("\n");

        // insert in an alphabetically ordered position
        let found = false;
        for (let i = 0; i < node.children.length; i++) {
          const n = node.children[i];
          // some nodes represent whitespace and newlines,
          // so only look at the JSXExpressionContainers, which are the type of code we're tyring to add
          if (
            !(
              nt.JSXExpressionContainer.check(n) &&
              nt.CallExpression.assert(n.expression) &&
              nt.Literal.assert(n.expression.arguments[1]) &&
              typeof n.expression.arguments[1].value === "string"
            )
          ) {
            continue;
          }

          const currentComponentName = n.expression.arguments[1].value.toLowerCase();
          // insert the new code once we found an alphabetically later component name
          if (currentComponentName > componentName.toLowerCase()) {
            node.children.splice(i, 0, newLinkAST, newlineAST);
            found = true;
            break;
          }
        }

        if (!found) {
          node.children.push(newLinkAST, newlineAST);
        }

        // stop traversing since we're onnly looking for one node
        return false;
      }

      return this.traverse(nodePath);
    },
  });
  fs.writeFileSync(sidebarFilePath, recast.print(ast, { wrapColumn: 100 }).code);

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
