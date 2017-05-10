import * as React from "react";

import sortDir from "./sortDirection";

export const sortDirection =  React.PropTypes.oneOf([
  sortDir.ASCENDING,
  sortDir.DESCENDING,
]);

export const sortState =  React.PropTypes.shape({
  columnID:  React.PropTypes.string,
  direction: sortDirection,
});

export const pageNumber = Object.assign(
  (props, propName, componentName) => {
    const value = props[propName];

    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value !== "number" || value < 1) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to ${componentName}. Must be a 1-based page index.`
      );
    }

    return null;
  }, {
    isRequired: (props, propName, componentName) => {
      const value = props[propName];
      if (value === null || value === undefined) {
        return new Error(`Missing required prop \`${propName}\` in ${componentName}.`);
      }

      return pageNumber(props, propName, componentName);
    },
  }
);
