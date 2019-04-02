import * as PropTypes from "prop-types";

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

      if (!value) {
        return null;
      }

      if (value.type !== componentClass) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to ${parentComponentName}. ` +
            `Must be of type ${componentClass}.`,
        );
      }

      return null;
    });
  }

  static oneOrManyOf(propType) {
    return PropTypes.oneOfType([propType, PropTypes.arrayOf(propType)]);
  }
}
