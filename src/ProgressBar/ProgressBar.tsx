import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { FlexBox, FlexItem } from "../flex";
import Progress from "./Progress";

import "./ProgressBar.less";

export interface Props {
  // props passed to Progress
  color?: string;
  fill?: number;
  size?: string;
  striped?: boolean;

  className?: string;
  inactive?: boolean;
  label?: string;
  labelType?: React.ReactNode;
  percentage?: number;
  showLabel?: string;
  style?: React.CSSProperties;
  width?: string | number;
  markNumbers?: number[];
}

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
  label: PropTypes.string,
  width: PropTypes.number,
  striped: PropTypes.bool,
  inactive: PropTypes.bool,
  showLabel: PropTypes.string,
  labelType: PropTypes.string,
  markNumbers: PropTypes.array,
};

const cssClass = {
  CONTAINER: "ProgressBar--container",
  BAR_CONTAINER: "ProgressBar--bar--container",
  BAR_BORDER: "ProgressBar--bar--border",
  TRACKER: "ProgressBar--bar--tracker",
  INACTIVE: "ProgressBar--bar--inactive",
  BAR_MARK: "ProgressBar--bar--mark",
  BAR_THICK_MARK: "ProgressBar--bar--mark--thick",
  boxContainer: (s) => `ProgressBar--boxContainer--${s}`,
  borderSize: (s) => `ProgressBar--bar--border--${s}`,
  containerSize: (s) => `ProgressBar--bar--container--${s}`,
  label: (p) => `ProgressBar--label--${p}`,
};

export default class ProgressBar extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = {
    size: Size.MEDIUM,
    color: "blue",
    width: 100,
    fill: 0,
    labelType: "percentage",
  };

  render() {
    const {
      className,
      style,
      color,
      fill,
      width,
      size,
      striped,
      inactive,
      markNumbers,
    } = this.props;
    const sizePX = SizePX[size];
    const topLabel = this._maybeTopLabel();
    const bottomLabel = this._maybeBottomLabel();

    const markNumbersInRange = (markNumbers || []).filter((mark) => mark < 100 && mark > 0).sort();
    const firstAfterFill = markNumbersInRange.find((mark) => mark > fill);

    return (
      <div className={classnames(cssClass.CONTAINER, inactive && cssClass.INACTIVE, className)}>
        <FlexBox
          className={classnames(cssClass.boxContainer(size))}
          column
          style={{
            width: `${width}%`,
          }}
        >
          {topLabel}
          <FlexItem grow>
            <div
              className={classnames(cssClass.BAR_CONTAINER, cssClass.containerSize(size))}
              style={{
                ...style,
                height: `${sizePX}px`,
              }}
            >
              <div className={classnames(cssClass.BAR_BORDER, cssClass.borderSize(size))} />
              {markNumbersInRange.map((element) => (
                <div
                  className={classnames(
                    cssClass.BAR_MARK,
                    firstAfterFill === element && cssClass.BAR_THICK_MARK,
                  )}
                  style={{
                    left: `${element}%`,
                  }}
                  key={element}
                />
              ))}
              <Progress
                fill={fill > 100 ? 100 : fill}
                color={color}
                size={size}
                striped={striped}
              />
            </div>
          </FlexItem>
          {bottomLabel}
        </FlexBox>
      </div>
    );
  }

  _maybeTopLabel = () => {
    const { showLabel } = this.props;
    const label = this._getLabel();

    switch (showLabel) {
      case ShowLabel.TOP_LEFT:
      case ShowLabel.TOP_MIDDLE:
      case ShowLabel.TOP_RIGHT:
        return (
          <FlexItem className={cssClass.label(showLabel)} grow>
            {label}
          </FlexItem>
        );
      default:
        return null;
    }
  };

  _maybeBottomLabel = () => {
    const { showLabel } = this.props;
    const label = this._getLabel();

    switch (showLabel) {
      case ShowLabel.BOTTOM_LEFT:
      case ShowLabel.BOTTOM_MIDDLE:
      case ShowLabel.BOTTOM_RIGHT:
        return (
          <FlexItem className={cssClass.label(showLabel)} grow>
            {label}
          </FlexItem>
        );
      default:
        return null;
    }
  };

  _getLabel = () => {
    const { fill, label, labelType } = this.props;

    if (labelType === "percentage") {
      return `${fill}%`;
    }

    if (label) {
      return label;
    }

    return labelType;
  };
}
