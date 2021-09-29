import "./FloatingButton.less";

import * as PropTypes from "prop-types";
import * as React from "react";
import * as RootCloseWrapper from "react-overlays/lib/RootCloseWrapper";
import * as _ from "lodash";
import * as classnames from "classnames";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import { Icon } from "../Icon/Icon";
import { Values } from "../utils/types";
import { breakpointS } from "../utils/Constants";

export interface Props {
  additionalButtons?: any[];
  animate?: boolean;
  className?: string;
  closeLabel?: React.ReactNode;
  colorGroup?: Values<typeof ColorGroup>;
  offsetX?: string;
  offsetY?: string;
  label?: React.ReactNode;
  onClick?: () => void;
  positionX?: string;
  positionY?: string;
  size?: Values<typeof Button.Size>;
  [additionalProp: string]: any;
}

interface State {
  active: boolean;
  positionX: string;
}

const cssClass = {
  ACTIVE: "FloatingButton--active",
  ANIMATE: "FloatingButton--animate",
  inactive: (positionY) => `FloatingButton--inactive--${positionY}`,

  propStyle: (prop) => `FloatingButton--${prop}`,

  BUTTON: "FloatingButton--button",
  CONTAINER: "FloatingButton--container",
  ICON: "FloatingButton--icon",
  SUB_ELEMENT: "FloatingButton--subElement",
};

const PositionX = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

const PositionY = {
  BOTTOM: "bottom",
  TOP: "top",
} as const;

// TODO: Move to <Button /> component
const ColorGroup = {
  GREEN: "green",
} as const;

const propTypes = {
  animate: PropTypes.bool,

  additionalButtons: PropTypes.array,

  colorGroup: PropTypes.oneOf(Object.values(ColorGroup)),
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

const iconSizes = {
  [Button.Size.S]: Icon.sizes.XXS,
  [Button.Size.M]: Icon.sizes.XS,
  [Button.Size.L]: Icon.sizes.XS,
} as const;

// add 'rem' if input is a number
function addSizeUnit(input: string) {
  var result = input;
  if (!isNaN(+input)) {
    result = `${input}rem`;
  }
  return result;
}

export default class FloatingButton extends React.PureComponent<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static ColorGroup = ColorGroup;
  static PositionX = PositionX;
  static PositionY = PositionY;

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      positionX: this.positionX(),
    };
  }

  onWindowResize = _.throttle(() => {
    this.setState({ positionX: this.positionX() });
  }, 1000);

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
  }

  positionX() {
    return window.innerWidth <= breakpointS ? PositionX.CENTER : this.props.positionX;
  }

  horizontalStyle() {
    const { offsetX } = this.props;
    const { positionX } = this.state;
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

  onRootClose = () => {
    this.setState({ active: false });
  };

  additionalButtonHandler(button) {
    this.setState({ active: false });
    button.onClick();
  }

  render() {
    const {
      additionalButtons,
      animate,
      colorGroup,
      className,
      closeLabel,
      label,
      positionY,
      size,
    } = this.props;
    const { active, positionX } = this.state;
    const additionalProps = _.omit(
      this.props,
      Object.keys(propTypes) as (keyof typeof propTypes)[],
    );

    return (
      <RootCloseWrapper onRootClose={this.onRootClose}>
        <FlexBox
          {...additionalProps}
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
                colorGroup && cssClass.propStyle(colorGroup),
                active && cssClass.propStyle("gray"),
              )}
              onClick={this.mainButtonHandler}
              value={
                active
                  ? closeLabel || (
                      <FlexBox alignItems="center">
                        <Icon
                          className={cssClass.ICON}
                          size={iconSizes[size]}
                          name={Icon.names.CLOSE_FLOATING_BUTTON}
                        />{" "}
                        Close
                      </FlexBox>
                    )
                  : label
              }
              aria-expanded={additionalButtons ? active : null}
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
                  className={classnames(
                    cssClass.BUTTON,
                    colorGroup && cssClass.propStyle(colorGroup),
                  )}
                  onClick={() => this.additionalButtonHandler(button)}
                  value={button.label}
                  size={size || Button.Size.M}
                  aria-hidden={!active}
                />
              </div>
            ))}
        </FlexBox>
      </RootCloseWrapper>
    );
  }
}
