import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./Progress.less";

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  striped: PropTypes.bool,
  size: PropTypes.string,
  fill: PropTypes.number,
};

const cssClass = {
  CONTAINER: "ProgressBar--Progress",
  STRIPED: "ProgressBar--Progress--striped",
  color: c => `ProgressBar--Progress--${c}`,
  border: (c, s) => `ProgressBar--Progress--${c}--${s}`,
};

export default class Progress extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { className, style, color, size, fill, striped } = this.props;
    let colorStyle = cssClass.color(color);
    let colorBorderStyle = cssClass.border(color, size);

    if (color === "changing") {
      if (fill < 30) {
        colorStyle = cssClass.color("red");
        colorBorderStyle = cssClass.border("red", size);
      } else if (fill < 90) {
        colorStyle = cssClass.color("orange");
        colorBorderStyle = cssClass.border("orange", size);
      } else {
        colorStyle = cssClass.color("green");
        colorBorderStyle = cssClass.border("green", size);
      }
    }

    if (fill === 0) {
      colorStyle = cssClass.color("none");
      colorBorderStyle = cssClass.border("none", size);
    }

    return (
      <div
        className={classnames(
          cssClass.CONTAINER,
          striped ? cssClass.STRIPED : null,
          colorStyle,
          colorBorderStyle,
          className,
        )}
        style={{
          ...style,
          width: `${fill === 0 ? 100 : fill}%`,
        }}
      />
    );
  }
}
