import * as _ from "lodash";
import * as classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import Option from "./Option";
import Type from "./Type";

import "./Menu.less";

export default class Menu extends React.PureComponent {
  _renderOption(option) {
    const { cssClass } = Menu;
    const { onHide, size, type } = this.props;
    const { children, className, disabled, href, onClick, target } = option.props;

    return (
      <Button
        className={classnames(cssClass.OPTION, className)}
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
    const { cssClass } = Menu;
    const { children, className } = this.props;

    return (
      <FlexBox className={classnames(cssClass.CONTAINER, className)} column>
        {React.Children.map(children, option => this._renderOption(option))}
      </FlexBox>
    );
  }
}

Menu.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  size: PropTypes.oneOf(_.values(Button.Size)),
  type: PropTypes.oneOf(_.values(Type)),
};

Menu.cssClass = {
  CONTAINER: "DropdownButton--Menu",
  OPTION: "DropdownButton--Option",
};
