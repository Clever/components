import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import "./ProgressBar.less";

const VALID_DIRECTIONS = ["up", "down", "right", "left"];
const DEFAULT_DIRECTION = "right";

export function ProgressBar({
  percentage, className, direction = DEFAULT_DIRECTION, style, length = "100%",
}) {
  const truePercentage = Math.max(0, Math.min(percentage, 1)) * 100;
  let progressStyle;
  let lengthStyle;

  switch (direction) {
    case "up":
    case "down":
      progressStyle = {height: `${truePercentage}%`};
      lengthStyle = {height: length};
      break;
    case "right":
    case "left":
      progressStyle = {width: `${truePercentage}%`};
      lengthStyle = {width: length};
      break;
    default:
      console.error(`Unexpected direction ${direction}, assuming "right"`);
      progressStyle = {width: `${truePercentage}%`};
      lengthStyle = {width: length};
  }

  const trueDirection = _.includes(VALID_DIRECTIONS, direction) ? direction : DEFAULT_DIRECTION;

  return (
    <div
      className={classnames("ProgressBar", `ProgressBar--${trueDirection}`, className)}
      style={_.assign({}, lengthStyle, style)}
    >
      <div
        className="ProgressBar--filledIn"
        style={_.assign({}, progressStyle)}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  percentage: PropTypes.number,
  style: PropTypes.object,
  direction: PropTypes.oneOf(VALID_DIRECTIONS),
  length: PropTypes.string,
};
