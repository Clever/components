import * as React from "react";

export default class MorePropTypes {
  static makeRequirable(propType) {
    propType.isRequired = (props, propName, componentName) => {
      const value = props[propName];
      if (value === null || value === undefined) {
        return new Error(`Missing required prop \`${propName}\` in ${componentName}.`);
      }

      return propType(props, propName, componentName);
    };

    return propType;
  }

  static instanceOfComponent(componentClass) {
    return MorePropTypes.makeRequirable((props, propName, parentComponentName) => {
      const value = props[propName];

      if (value === null || value === undefined) {
        return null;
      }

      if (value.type !== componentClass) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to ${parentComponentName}. `
          + `Must be of type ${componentClass}.`
        );
      }

      return null;
    });
  }

  static oneOrManyOf(propType) {
    return React.PropTypes.oneOfType([
      propType,
      React.PropTypes.arrayOf(propType),
    ]);
  }
}
