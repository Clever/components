import * as _ from "lodash";
import * as classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import * as Overlay from "react-bootstrap/lib/Overlay";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as FontAwesome from "react-fontawesome";

import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";
import Menu from "./Menu";
import Option from "./Option";
import { Type, ArrowType } from "./Type";
import { Button, Props as ButtonProps } from "../Button/Button";

import { ChildrenOf, Values } from "../utils/types";

import "./Caret.less";
import "./DropdownButton.less";

export interface Props {
  children?: ChildrenOf<typeof Option>;
  className?: string;
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: Function;
  size?: ButtonProps["size"];
  target?: "_self" | "_blank";
  type?: Values<typeof Type>;
  arrowType?: Values<typeof ArrowType>;
}

interface State {
  expanded: boolean;
}

const propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(_.values(Button.Size)),
  target: PropTypes.oneOf(["_self", "_blank"]),
  type: PropTypes.oneOf(_.values(Type)),
  arrowType: PropTypes.oneOf(_.values(ArrowType)),
};

const defaultProps = {
  size: Button.Size.M,
  type: Type.SECONDARY,
  arrowType: ArrowType.CARET,
};

export const cssClass = {
  BUTTONS: "DropdownButton--buttons",
  CARET_CONTAINER: "DropdownButton--Caret--container",
  CARET: "DropdownButton--Caret",
  CONTAINER: "DropdownButton",
  MAIN: "DropdownButton--main",
  POPUP: "DropdownButton--popup",
  SECTION: "DropdownButton--section",
  TOGGLE: "DropdownButton--toggle",
};

export default class DropdownButton extends React.PureComponent<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Option = Option;
  static Size = Button.Size;
  static Type = Type;

  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  _renderMainButton() {
    const { disabled, href, label, onClick, size, target, type } = this.props;

    return (
      <FlexItem
        className={classnames(cssClass.SECTION, cssClass.MAIN)}
        component={Button}
        disabled={disabled}
        grow
        href={href}
        onClick={onClick}
        size={size}
        target={target}
        type={type}
        value={label}
      />
    );
  }

  render() {
    const { children, className, disabled, size, type, arrowType } = this.props;
    const passthroughProps = _.omit(this.props, Object.keys(
      propTypes,
    ) as (keyof typeof propTypes)[]);

    const { expanded } = this.state;

    if (React.Children.count(children) === 0) {
      return (
        <div {...passthroughProps} className={classnames(cssClass.CONTAINER, className)}>
          {this._renderMainButton()}
        </div>
      );
    }

    let arrowTypeRender;
    if (arrowType === ArrowType.CARET) {
      arrowTypeRender = (
        <span className={cssClass.CARET_CONTAINER}>
          <span className={cssClass.CARET} />
        </span>
      );
    } else {
      arrowTypeRender = (
        <span className={cssClass.CARET_CONTAINER}>
          <FontAwesome name="ellipsis-v" />
        </span>
      );
    }

    return (
      <div {...passthroughProps} className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.BUTTONS}>
          {this._renderMainButton()}
          <Button
            className={classnames(cssClass.SECTION, cssClass.TOGGLE)}
            disabled={disabled}
            onClick={() => this.setState({ expanded: !expanded })}
            size={size}
            type={type}
            value={arrowTypeRender}
          />
        </FlexBox>
        <Overlay
          className={cssClass.POPUP}
          container={this}
          onHide={() => this.setState({ expanded: false })}
          placement="bottom"
          rootClose
          show={!disabled && expanded}
        >
          <Menu onHide={() => this.setState({ expanded: false })} size={size} type={type}>
            {children}
          </Menu>
        </Overlay>
      </div>
    );
  }
}
