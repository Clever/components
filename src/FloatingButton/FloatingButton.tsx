import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";

import "./FloatingButton.less";

const cssClass = {
  ACTIVE: "FloatingButton--active",
  ANIMATE: "FloatingButton--animate",
  inactive: positionY => `FloatingButton--inactive--${positionY}`,

  propStyle: prop => `FloatingButton--${prop}`,

  BUTTON: "FloatingButton--button",
  CONTAINER: "FloatingButton--container",
  SUB_ELEMENT: "FloatingButton--subElement",
};

const propTypes = {
  animate: PropTypes.bool,

  additionalButtons: PropTypes.array,

  bgColor: PropTypes.oneOf(["green"]),
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
    const { additionalButtons, onClick } = this.props;
    const { active } = this.state;
    if (additionalButtons && additionalButtons.length) {
      // main button activates additional buttons
      this.setState({ active: !active });
    }
    if (onClick) {
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
    const { active } = this.state;

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
        <div className={classnames(cssClass.SUB_ELEMENT)}>
          <Button
            className={classnames(
              cssClass.BUTTON,
              bgColor ? cssClass.propStyle(bgColor) : "",
              active ? cssClass.propStyle("gray") : "",
            )}
            onClick={this.mainButtonHandler}
            value={
              active
                ? closeLabel || (
                    <div>
                      <FontAwesome name="times" /> Close
                    </div>
                  )
                : label
            }
            size={size || "regular"}
          />
        </div>
        {additionalButtons &&
          additionalButtons.map((button, i) => (
            <div
              className={classnames(
                cssClass.SUB_ELEMENT,
                !active ? cssClass.inactive(positionY) : "",
                animate ? cssClass.ANIMATE : "",
                button.className,
              )}
              key={i}
            >
              <Button
                className={classnames(cssClass.BUTTON, bgColor ? cssClass.propStyle(bgColor) : "")}
                onClick={button.onClick}
                value={button.label}
                size={size || "regular"}
              />
            </div>
          ))}
      </FlexBox>
    );
  }
}
