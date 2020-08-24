import * as PropTypes from "prop-types";

import sortDir from "./sortDirection";

export const sortDirection = PropTypes.oneOf<"asc" | "desc">([
  sortDir.ASCENDING,
  sortDir.DESCENDING,
]);

export const sortState = PropTypes.shape({
  columnID: PropTypes.string,
  direction: sortDirection,
});

export const pageNumber = (props, propName, componentName) => {
  const value = props[propName];

  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "number" || value < 1) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to ${componentName}. Must be a 1-based page index.`,
    );
  }

  return null;
};

pageNumber.isRequired = (props, propName, componentName) => {
  const value = props[propName];
  if (value === null || value === undefined) {
    return new Error(`Missing required prop \`${propName}\` in ${componentName}.`);
  }

  return pageNumber(props, propName, componentName);
};
