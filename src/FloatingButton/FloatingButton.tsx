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

export const PositionX = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
};

export const PositionY = {
  BOTTOM: "bottom",
  TOP: "top",
};

// TODO: Move to <Button /> component
export const ColorGroup = {
  GREEN: "green",
};

const propTypes = {
  animate: PropTypes.bool,

  additionalButtons: PropTypes.array,

  bgColor: PropTypes.oneOf(Object.values(ColorGroup)),
  className: PropTypes.string,
  closeLabel: PropTypes.node,
  label: PropTypes.node,

  onClick: PropTypes.func,

  offsetX: PropTypes.string,
  offsetY: PropTypes.string,
  positionX: PropTypes.oneOf(Object.values(PositionX)),
  positionY: PropTypes.oneOf(Object.values(PositionY)),
  size: PropTypes.oneOf(Object.values(Button.Size)),
};

const defaultProps = {
  animate: true,
  label: "+",
  offsetX: "2",
  offsetY: "2",
  positionX: PositionX.RIGHT,
  positionY: PositionY.BOTTOM,
};

// add 'rem' if input is a number
function addSizeUnit(input: string) {
  if (!isNaN(+input)) {
    input = `${input}rem`;
  }
  return input;
}

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
    if (positionX === PositionX.CENTER) return {};
    return positionX === PositionX.LEFT
      ? {
          left: addSizeUnit(offsetX),
        }
      : {
          // default to right if a bad positionX input provided
          right: addSizeUnit(offsetX),
        };
  }

  verticalStyle() {
    const { offsetY, positionY } = this.props;
    return positionY === PositionY.TOP
      ? {
          top: addSizeUnit(offsetY),
        }
      : {
          // default to bottom orientation
          bottom: addSizeUnit(offsetY),
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
              bgColor && cssClass.propStyle(bgColor),
              active && cssClass.propStyle("gray"),
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
            size={size || Button.Size.M}
          />
        </div>
        {additionalButtons &&
          additionalButtons.map((button, i) => (
            <div
              className={classnames(
                cssClass.SUB_ELEMENT,
                !active && cssClass.inactive(positionY),
                animate && cssClass.ANIMATE,
                button.className,
              )}
              key={i}
            >
              <Button
                className={classnames(cssClass.BUTTON, bgColor && cssClass.propStyle(bgColor))}
                onClick={button.onClick}
                value={button.label}
                size={size || Button.Size.M}
              />
            </div>
          ))}
      </FlexBox>
    );
  }
}
