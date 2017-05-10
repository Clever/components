import _ from "lodash";
import classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import * as React from "react";

import {Button, SIZES as BUTTON_SIZES} from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import Option from "./Option";
import Type from "./Type";

import "./Menu.less";


const CLASSNAMES = {
  CONTAINER: "DropdownButton--Menu",
  OPTION: "DropdownButton--Option",
};

export default class Menu extends React.PureComponent {
  _renderOption(option) {
    const {onHide, size, type} = this.props;
    const {children, className, disabled, href, onClick, target} = option.props;

    return (
      <Button
        className={classnames(CLASSNAMES.OPTION, className)}
        disabled={disabled}
        href={href}
        onClick={e => {
          onHide();

          if (onClick) {
            onClick(e);
          }
        }}
        size={size}
        target={target}
        type={type}
        value={children}
      />
    );
  }

  render() {
    const {children, className} = this.props;

    return (
      <FlexBox className={classnames(CLASSNAMES.CONTAINER, className)} column>
        {React.Children.map(children, option => this._renderOption(option))}
      </FlexBox>
    );
  }
}

Menu.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className:  React.PropTypes.string,
  onHide:  React.PropTypes.func.isRequired,
  size:  React.PropTypes.oneOf(_.values(BUTTON_SIZES)),
  type:  React.PropTypes.oneOf(_.values(Type)),
};
