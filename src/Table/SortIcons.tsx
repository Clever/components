import classnames from "classnames";
import * as React from "react";

import * as tablePropTypes from "./tablePropTypes";
import sortDirection from "./sortDirection";

const WIDTH = 7;
const HEIGHT = 12;

const CLASSNAMES = {
  ACTIVE: "Table--sort_icons--direction--active",
  ASCENDING: "Table--sort_icons--direction--ascending",
  CONTAINER: "Table--sort_icons",
  DESCENDING: "Table--sort_icons--direction--descending",
  DIRECTION: "Table--sort_icons--direction",
};

export default function SortIcons({direction, className, scale}) {
  return (
    <svg
      className={classnames(CLASSNAMES.CONTAINER, className)}
      width={WIDTH * scale}
      height={HEIGHT * scale}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <polygon
        className={classnames(
          CLASSNAMES.DIRECTION,
          CLASSNAMES.ASCENDING,
          direction === sortDirection.ASCENDING && CLASSNAMES.ACTIVE
        )}
        points="3.5 0 7 5 0 5"
      />
      <polygon
        className={classnames(
          CLASSNAMES.DIRECTION,
          CLASSNAMES.DESCENDING,
          direction === sortDirection.DESCENDING && CLASSNAMES.ACTIVE
        )}
        points="3.5 12 7 7 0 7"
      />
    </svg>
  );
}

SortIcons.propTypes = {
  direction: tablePropTypes.sortDirection,
  className:  React.PropTypes.string,
  scale:  React.PropTypes.number,
};

SortIcons.defaultProps = {
  scale: 1,
};
