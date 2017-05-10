import _ from "lodash";
import classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import Overlay from "react-bootstrap/lib/Overlay";
import * as React from "react";

import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";
import Menu from "./Menu";
import Option from "./Option";
import Type from "./Type";
import {Button, SIZES as BUTTON_SIZES} from "../Button/Button";

import "./Caret.less";
import "./DropdownButton.less";

const CLASSNAMES = {
  BUTTONS: "DropdownButton--buttons",
  CARET_CONTAINER: "DropdownButton--Caret--container",
  CARET: "DropdownButton--Caret",
  CONTAINER: "DropdownButton",
  MAIN: "DropdownButton--main",
  POPUP: "DropdownButton--popup",
  SECTION: "DropdownButton--section",
  TOGGLE: "DropdownButton--toggle",
};

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  _renderMainButton() {
    const {disabled, href, label, onClick, size, target, type} = this.props;

    return (
      <FlexItem
        className={classnames(CLASSNAMES.SECTION, CLASSNAMES.MAIN)}
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
    const {propTypes} = DropdownButton;
    const {children, className, disabled, size, type} = this.props;
    const passthroughProps = _.omit(this.props, Object.keys(propTypes));
    const {expanded} = this.state;

    if (React.Children.count(children) === 0) {
      return (
        <div {...passthroughProps} className={classnames(CLASSNAMES.CONTAINER, className)}>
          {this._renderMainButton()}
        </div>
      );
    }

    return (
      <div {...passthroughProps} className={classnames(CLASSNAMES.CONTAINER, className)}>
        <FlexBox className={CLASSNAMES.BUTTONS}>
          {this._renderMainButton()}
          <Button
            className={classnames(CLASSNAMES.SECTION, CLASSNAMES.TOGGLE)}
            disabled={disabled}
            onClick={() => this.setState({expanded: !expanded})}
            size={size}
            type={type}
            value={(
              <span className={CLASSNAMES.CARET_CONTAINER}>
                <span className={CLASSNAMES.CARET} />
              </span>
            )}
          />
        </FlexBox>
        <Overlay
          className={CLASSNAMES.POPUP}
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

DropdownButton.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className:  React.PropTypes.string,
  disabled:  React.PropTypes.bool,
  href:  React.PropTypes.string,
  label:  React.PropTypes.string.isRequired,
  onClick:  React.PropTypes.func,
  size:  React.PropTypes.oneOf(_.values(BUTTON_SIZES)),
  target:  React.PropTypes.oneOf(["_self", "_blank"]),
  type:  React.PropTypes.oneOf(_.values(Type)),
};

DropdownButton.defaultProps = {
  size: BUTTON_SIZES.M,
  type: Type.SECONDARY,
};
