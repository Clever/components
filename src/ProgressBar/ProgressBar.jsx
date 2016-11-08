import React, {PropTypes} from "react";
import classnames from "classnames";
import _ from "lodash";

import "./ProgressBar.less";
export function ProgressBar({percentage, className, style}) {
  const truePercentage = Math.max(0, Math.min(percentage, 1)) * 100;
  return (
    <div className={classnames("ProgressBar", className)}>
      <div
        className="ProgressBar--filledIn"
        style={_.assign({}, style, {width: `${truePercentage}%`})}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  percentage: PropTypes.number,
  style: PropTypes.object,
};
