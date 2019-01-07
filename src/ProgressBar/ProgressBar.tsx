import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {FlexBox, FlexItem} from "../flex";
import Progress from "./Progress";

import "./ProgressBar.less";

const Size = {
  THIN: "thin",
  MEDIUM: "medium",
  THICK: "thick",
};

const ShowLabel = {
  TOP_LEFT: "top-left",
  TOP_MIDDLE: "top-middle",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_MIDDLE: "bottom-middle",
  BOTTOM_RIGHT: "bottom-right",
};

const SizePX = {
  [Size.THIN]: 12,
  [Size.MEDIUM]: 16,
  [Size.THICK]: 20,
};

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number,
  striped: PropTypes.bool,
  inactive: PropTypes.bool,
  showLabel: PropTypes.string,
  labelType: PropTypes.string,
};

const cssClass = {
  CONTAINER: "ProgressBar--container",
  BAR_CONTAINER: "ProgressBar--bar--container",
  BAR_BORDER: "ProgressBar--bar--border",
  TRACKER: "ProgressBar--bar--tracker",
  INACTIVE: "ProgressBar--bar--inactive",
  boxContainer: (s) => `ProgressBar--boxContainer--${s}`,
  borderSize: (s) => `ProgressBar--bar--border--${s}`,
  containerSize: (s) => `ProgressBar--bar--container--${s}`,
  label: (p) => `ProgressBar--label--${p}`,
};

export default class ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {fillPercentage: props.fill};
  }

  static propTypes = propTypes;
  static cssClass = cssClass;
  static defaultProps = {
    size: Size.MEDIUM,
    color: "blue",
    width: 100,
    fill: 0,
    labelType: "percentage",
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.fill !== nextProps.fill) {
      const fill = nextProps.fill;
      if (!isNaN(fill)) {
        if (fill > 100) {
          this.setState({fillPercentage: 100});
        } else if (fill < 0) {
          this.setState({fillPercentage: 0});
        } else {
          this.setState({fillPercentage: fill});
        }
      }
    }
  }

  render() {
    const {className, style, color, width, size, striped, inactive} = this.props;
    const {fillPercentage} = this.state;
    const sizePX = SizePX[size];
    const topLabel = this._maybeTopLabel();
    const bottomLabel = this._maybeBottomLabel();

    return (
      <div
        className={classnames(
          cssClass.CONTAINER,
          inactive && cssClass.INACTIVE,
        )}
      >
        <FlexBox
          className={classnames(
            cssClass.boxContainer(size),
          )}
          column
          style={{
            width: `${width}%`,
          }}
        >
          {topLabel}
          <FlexItem grow>
            <div
              className={classnames(
                cssClass.BAR_CONTAINER,
                cssClass.containerSize(size),
                className,
              )}
              style={{
                ...style,
                height: `${sizePX}px`,
              }}
            >
              <div className={classnames(cssClass.BAR_BORDER, cssClass.borderSize(size))}></div>
              <Progress fill={fillPercentage} color={color} size={size} striped={striped} />
            </div>
          </FlexItem>
          {bottomLabel}
        </FlexBox>
      </div>
    );
  }

  _maybeTopLabel = () => {
    const {showLabel, labelType} = this.props;
    const {fillPercentage} = this.state;
    switch (showLabel) {
      case ShowLabel.TOP_LEFT:
      case ShowLabel.TOP_MIDDLE:
      case ShowLabel.TOP_RIGHT:
        return (
          <FlexItem className={cssClass.label(showLabel)} grow>
            {labelType === "percentage" ? `${fillPercentage}%` : labelType}
          </FlexItem>
        );
      default:
        return null;
    }
  }

  _maybeBottomLabel = () => {
    const {showLabel, labelType} = this.props;
    const {fillPercentage} = this.state;
    switch (showLabel) {
      case ShowLabel.BOTTOM_LEFT:
      case ShowLabel.BOTTOM_MIDDLE:
      case ShowLabel.BOTTOM_RIGHT:
        return (
          <FlexItem className={cssClass.label(showLabel)} grow>
            {labelType === "percentage" ? `${fillPercentage}%` : labelType}
          </FlexItem>
        );
      default:
        return null;
    }
  }
}
