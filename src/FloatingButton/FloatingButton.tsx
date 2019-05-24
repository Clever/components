import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";

import "./FloatingButton.less";

const cssClass = {
  ACTIVE: "FloatingButton--active",
  inactive: positionY => `FloatingButton--inactive--${positionY}`,

  propStyle: prop => `FloatingButton--${prop}`,

  BUTTON: "FloatingButton--button",
  CONTAINER: "FloatingButton--container",
  REMOVE: "FloatingButton--remove",
  SUB_ELEMENT: "FloatingButton--subElement",
};

const propTypes = {
  animate: PropTypes.bool,

  additionalButtons: PropTypes.array,

  bgColor: PropTypes.string,
  className: PropTypes.string,
  closeLabel: PropTypes.node,
  label: PropTypes.node,

  onClick: PropTypes.func,

  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  positionX: PropTypes.oneOf(["left", "center", "right"]),
  positionY: PropTypes.oneOf(["bottom", "top"]),
  size: PropTypes.string,
};

const defaultProps = {
  animate: true,
  label: "+",
  offsetX: 30,
  offsetY: 30,
  positionX: "right",
  positionY: "bottom",
};

export default class FloatingButton extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      display: false,
    };
  }

  horizontalStyle() {
    const { offsetX, positionX } = this.props;
    if (positionX === "center") return {};
    return positionX === "left"
      ? {
          left: `${offsetX}px`,
        }
      : {
          // default to right if a bad positionX input provided
          right: `${offsetX}px`,
        };
  }

  verticalStyle() {
    const { offsetY, positionY } = this.props;
    return positionY === "top"
      ? {
          top: `${offsetY}px`,
        }
      : {
          // default to bottom orientation
          bottom: `${offsetY}px`,
        };
  }

  mainButtonHandler = () => {
    const { additionalButtons, animate, onClick } = this.props;
    const { active } = this.state;
    if (additionalButtons && additionalButtons.length) {
      // main button activates additional buttons
      if (active) {
        // stop displaying when transition to inactive state complete
        this.setState({ active: false, display: true });
        setTimeout(() => this.setState({ display: false }), animate ? 200 : 0);
      } else {
        this.setState({ active: true, display: true });
      }
    }
    if (onClick && !active) {
      onClick();
    }
  };

  render() {
    const {
      additionalButtons,
      animate,
      bgColor,
      className,
      closeLabel,
      label,
      positionX,
      positionY,
      size,
    } = this.props;
    const { active, display } = this.state;

    return (
      <FlexBox
        className={classnames(
          cssClass.CONTAINER,
          cssClass.propStyle(positionX),
          cssClass.propStyle(positionY),
          className,
        )}
        style={{
          ...this.horizontalStyle(),
          ...this.verticalStyle(),
        }}
      >
        <div className={classnames(cssClass.SUB_ELEMENT, className)}>
          <Button
            className={cssClass.BUTTON}
            onClick={this.mainButtonHandler}
            value={
              active
                ? closeLabel || (
                    <div>
                      <span className="fa fa-times" /> Close
                    </div>
                  )
                : label
            }
            size={size || "regular"}
            style={{
              borderRadius: "500px",
              ...(bgColor
                ? {
                    backgroundColor: bgColor,
                    borderColor: bgColor,
                  }
                : {}),
              ...(active
                ? {
                    backgroundColor: "#474c5e", // @neutral_dark_gray
                    borderColor: "#474c5e",
                    color: "white",
                  }
                : {}),
            }}
          />
        </div>
        {additionalButtons &&
          additionalButtons.map((button, i) => (
            <div
              className={classnames(
                cssClass.SUB_ELEMENT,
                !active && animate ? cssClass.inactive(positionY) : "",
                button.className,
              )}
              key={i}
            >
              <Button
                className={classnames(cssClass.BUTTON, !(active || display) ? cssClass.REMOVE : "")}
                onClick={button.onClick}
                value={button.label}
                size={size || "regular"}
                style={{
                  borderRadius: "500px",
                  ...(bgColor
                    ? {
                        backgroundColor: bgColor,
                        borderColor: bgColor,
                      }
                    : {}),
                }}
              />
            </div>
          ))}
      </FlexBox>
    );
  }
}
