import * as _ from "lodash";
import { Transform } from "jscodeshift";

// https://astexplorer.net/#/gist/851a55838151c274b233e5318d23bd68/0aa8af858342710749b755ae9512de491f24e02c
const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;

  const root = j(file.source);
  const componentsToDisplay = root.find(j.AssignmentExpression, {
    left: {
      object: {
        name: "ComponentsView",
      },
      property: {
        name: "componentsToDisplay",
      },
    },
  });
  if (componentsToDisplay.length !== 1) {
    console.error("unable to find proper componentsToDisplay variable");
    return null;
  }

  const componentRoutePath = _.kebabCase(options.componentName);
  const objectCode = j.objectExpression([
    j.objectProperty(j.identifier("componentLink"), j.literal(`${componentRoutePath}`)),
    j.objectProperty(j.identifier("componentImg"), j.literal(`${componentRoutePath}.png`)),
    j.objectProperty(j.identifier("componentName"), j.literal(`${options.componentName}`)),
    j.objectProperty(
      j.identifier("componentAlt"),
      j.literal(`A ${options.componentName} component`),
    ),
  ]);
  // insert in an alphabetically ordered position
  let insertIndex = -1;
  const nodeToInsertAt = componentsToDisplay
    .find(j.ObjectExpression)
    .forEach((path, i) => {
      if (insertIndex !== -1) {
        return;
      }

      // find the property with the "componentName" property
      const componentNameProperty = j(path.value)
        .find(j.Property, {
          key: {
            type: "Identifier",
            name: "componentName",
          },
        })
        .get();

      const node = componentNameProperty.node.value;
      if (!j.Literal.check(node) || typeof node.value !== "string") {
        return;
      }

      // get the value of the "component" prop
      const currentComponentName = node.value.toLocaleLowerCase();
      // insert the new code once we found an alphabetically later component name
      if (currentComponentName > options.componentName.toLocaleLowerCase()) {
        insertIndex = i;
      }
    })
    .at(insertIndex);

  if (insertIndex === -1) {
    nodeToInsertAt.insertAfter(objectCode);
  } else {
    nodeToInsertAt.insertBefore(objectCode);
  }

  return root.toSource({ wrapColumn: 100 });
};

export default transform;
