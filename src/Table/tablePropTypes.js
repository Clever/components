import {PropTypes} from "react";

import sortDir from "./sortDirection";

export const sortDirection = PropTypes.oneOf([
  sortDir.ASCENDING,
  sortDir.DESCENDING,
]);

export const sortState = PropTypes.shape({
  columnID: PropTypes.string,
  direction: sortDirection,
});
