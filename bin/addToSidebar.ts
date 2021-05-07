import * as _ from "lodash";
import { Transform } from "jscodeshift";

// https://astexplorer.net/#/gist/bc75762e3cd5e7f5286dc8949aff1f7e/6351be92800aa6072be98960e417dbdb9d051998
const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;

  const root = j(file.source);
  const navGroups = root
    .findJSXElements("NavGroup")
    .filter(j.filters.JSXElement.hasAttributes({ id: "components" }));
  if (navGroups.length !== 1) {
    console.error("unable to find NavGroup element");
    return null;
  }

  const componentRoutePath = _.kebabCase(options.componentName);
  const newLinkCode = j(
    `{this._renderLink("/components/${componentRoutePath}", "${options.componentName}")}`,
  ).get("program", "body").value;
  const newlineAST = j.jsxText("\n");

  // insert in an alphabetically ordered position
  let insertIndex = -1;
  const nodeToInsertAt = navGroups
    // if we use .find() directly, we will also select the icon prop that uses a JSXExpressionContainer
    // as well as potentially other nested elements
    .childNodes()
    // some nodes represent whitespace and newlines,
    // so only look at the JSXExpressionContainers, which are the type of code we're tyring to add
    .filter((path) => j.JSXExpressionContainer.check(path.node))
    .forEach((path, i) => {
      if (insertIndex !== -1) {
        return;
      }
      const node = path.node;

      if (
        !(
          j.JSXExpressionContainer.check(node) &&
          j.CallExpression.assert(node.expression) &&
          j.Literal.assert(node.expression.arguments[1]) &&
          typeof node.expression.arguments[1].value === "string"
        )
      ) {
        return;
      }

      // insert the new code once we found an alphabetically later component name
      const currentComponentName = node.expression.arguments[1].value.toLocaleLowerCase();
      if (currentComponentName > options.componentName.toLocaleLowerCase()) {
        insertIndex = i;
      }
    })
    .at(insertIndex);

  if (insertIndex === -1) {
    nodeToInsertAt.insertAfter(newLinkCode);
    nodeToInsertAt.insertAfter(newlineAST);
  } else {
    nodeToInsertAt.insertBefore(newLinkCode);
    nodeToInsertAt.insertBefore(newlineAST);
  }

  return root.toSource({ wrapColumn: 100 });
};

export default transform;
