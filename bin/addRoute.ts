import * as _ from "lodash";
import { Transform, ImportDeclaration } from "jscodeshift";

// https://astexplorer.net/#/gist/27fed1c81451a3539211c67f78d44fad/7270e4805e6293c00b963ce9feb9f40451d48d3f
const addImport: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const newImportStatement = j(
    `import ${options.componentName} from "./components/${options.componentName}";`,
  ).get("program", "body").value;
  return (
    j(file.source)
      .find(j.ImportDeclaration, (node: ImportDeclaration) => {
        if (typeof node.source.value !== "string") {
          return false;
        }

        return node.source.value.startsWith("./components");
      })
      // need to insert in between the imports since whitespace gets weird otherwise
      .at(0)
      .insertAfter(newImportStatement)
      .toSource()
  );
};

// https://astexplorer.net/#/gist/bc75762e3cd5e7f5286dc8949aff1f7e/6351be92800aa6072be98960e417dbdb9d051998
const addRoute: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const componentRoutePath = _.kebabCase(options.componentName);
  const routeCode = j(
    `<Route path="${componentRoutePath}(/*)" component={${options.componentName}} />`,
  ).get("program", "body").value;
  const newlineAST = j.jsxText("\n");

  // insert in an alphabetically ordered position
  let insertIndex = -1;
  return j(file.source)
    .findJSXElements("Route")
    .filter(j.filters.JSXElement.hasAttributes({ path: "components" }))
    .childElements()
    .forEach((path, i) => {
      if (insertIndex !== -1) {
        return;
      }

      if (!path.node.openingElement.attributes) {
        return;
      }

      // find the route with the "component" prop name
      const attributeNode = j(path.get("openingElement", "attributes"))
        .find(j.JSXAttribute, {
          name: {
            type: "JSXIdentifier",
            name: "component",
          },
        })
        .get();

      const node = attributeNode.node.value;
      if (!(j.JSXExpressionContainer.check(node) && j.Identifier.assert(node.expression))) {
        return;
      }

      // get the value of the "component" prop
      const currentComponentName = node.expression.name;
      // insert the new code once we found an alphabetically later component name
      if (currentComponentName > options.componentName) {
        insertIndex = i;
      }
    })
    .at(insertIndex)
    .insertAfter(routeCode)
    .insertAfter(newlineAST)
    .toSource();
};

// https://github.com/facebook/jscodeshift/issues/148#issuecomment-341366999
const transform: Transform = (file, api, options) => {
  const transforms = [addImport, addRoute];
  let src = file.source;
  transforms.forEach((t) => {
    if (typeof src === "undefined") {
      return;
    }
    const nextSrc = t({ ...file, source: src }, api, options);

    if (nextSrc) {
      src = nextSrc;
    }
  });
  return src;
};

export default transform;
