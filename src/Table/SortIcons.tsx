import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import * as tablePropTypes from "./tablePropTypes";
import sortDirection from "./sortDirection";

export interface Props {
  className?: string;
  direction?: "asc" | "desc";
  scale?: number;
}

const WIDTH = 7;
const HEIGHT = 12;

export const cssClass = {
  ACTIVE: "Table--sort_icons--direction--active",
  ASCENDING: "Table--sort_icons--direction--ascending",
  CONTAINER: "Table--sort_icons",
  DESCENDING: "Table--sort_icons--direction--descending",
  DIRECTION: "Table--sort_icons--direction",
};

export default function SortIcons({ direction, className, scale }: Props) {
  return (
    <svg
      className={classnames(cssClass.CONTAINER, className)}
      width={WIDTH * scale}
      height={HEIGHT * scale}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <polygon
        className={classnames(
          cssClass.DIRECTION,
          cssClass.ASCENDING,
          direction === sortDirection.ASCENDING && cssClass.ACTIVE,
        )}
        points="3.5 0 7 5 0 5"
      />
      <polygon
        className={classnames(
          cssClass.DIRECTION,
          cssClass.DESCENDING,
          direction === sortDirection.DESCENDING && cssClass.ACTIVE,
        )}
        points="3.5 12 7 7 0 7"
      />
    </svg>
  );
}

SortIcons.propTypes = {
  direction: tablePropTypes.sortDirection,
  className: PropTypes.string,
  scale: PropTypes.number,
};

SortIcons.defaultProps = {
  scale: 1,
};
