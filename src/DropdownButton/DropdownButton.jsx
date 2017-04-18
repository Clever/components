import _ from "lodash";
import classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import Overlay from "react-bootstrap/lib/Overlay";
import React, {PropTypes, PureComponent} from "react";

import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";
import Menu from "./Menu";
import Option from "./Option";
import Type from "./Type";
import {Button} from "../Button/Button";

import "./Caret.less";
import "./DropdownButton.less";


export default class DropdownButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  _renderMainButton() {
    const {cssClass} = DropdownButton;
    const {disabled, href, label, onClick, size, target, type} = this.props;

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
    const {cssClass, propTypes} = DropdownButton;
    const {children, className, disabled, size, type} = this.props;
    const passthroughProps = _.omit(this.props, Object.keys(propTypes));
    const {expanded} = this.state;

    if (React.Children.count(children) === 0) {
      return (
        <div {...passthroughProps} className={classnames(cssClass.CONTAINER, className)}>
          {this._renderMainButton()}
        </div>
      );
    }

    return (
      <div {...passthroughProps} className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.BUTTONS}>
          {this._renderMainButton()}
          <Button
            className={classnames(cssClass.SECTION, cssClass.TOGGLE)}
            disabled={disabled}
            onClick={() => this.setState({expanded: !expanded})}
            size={size}
            type={type}
            value={(
              <span className={cssClass.CARET_CONTAINER}>
                <span className={cssClass.CARET} />
              </span>
            )}
          />
        </FlexBox>
        <Overlay
          className={cssClass.POPUP}
          container={this}
          onHide={() => this.setState({expanded: false})}
          placement="bottom"
          rootClose
          show={!disabled && expanded}
        >
          <Menu onHide={() => this.setState({expanded: false})} size={size} type={type}>
            {children}
          </Menu>
        </Overlay>
      </div>
    );
  }
}

DropdownButton.Option = Option;

DropdownButton.Size = Button.Size;

DropdownButton.Type = Type;

DropdownButton.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(_.values(DropdownButton.Size)),
  target: PropTypes.oneOf(["_self", "_blank"]),
  type: PropTypes.oneOf(_.values(DropdownButton.Type)),
};

DropdownButton.defaultProps = {
  size: DropdownButton.Size.M,
  type: DropdownButton.Type.SECONDARY,
};

DropdownButton.cssClass = {
  BUTTONS: "DropdownButton--buttons",
  CARET_CONTAINER: "DropdownButton--Caret--container",
  CARET: "DropdownButton--Caret",
  CONTAINER: "DropdownButton",
  MAIN: "DropdownButton--main",
  POPUP: "DropdownButton--popup",
  SECTION: "DropdownButton--section",
  TOGGLE: "DropdownButton--toggle",
};
