import * as _ from "lodash";
import * as classnames from "classnames";
import MorePropTypes from "../utils/MorePropTypes";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import Option from "./Option";
import { Type } from "./Type";

import { Values } from "../utils/types";

import "./Menu.less";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  onHide: () => void;
  size?: Values<typeof Button.Size>;
  type?: Values<typeof Type>;
}

const propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Option)),
  className: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  size: PropTypes.oneOf(_.values(Button.Size)),
  type: PropTypes.oneOf(_.values(Type)),
};

export const cssClass = {
  CONTAINER: "DropdownButton--Menu",
  OPTION: "DropdownButton--Option",
  WHITE_BACKGROUND: "DropdownButton--WhiteBackground",
};

export default class Menu extends React.PureComponent<Props> {
  static propTypes = propTypes;

  _renderOption(option) {
    const { onHide, size, type } = this.props;
    const { children, className, disabled, href, onClick, target } = option.props;

    // Add the background color back in for the buttons
    let backgroundColorClass = "";
    if (type === Type.LINK) {
      backgroundColorClass = cssClass.WHITE_BACKGROUND;
    }

    return (
      <Button
        className={classnames(cssClass.OPTION, className, backgroundColorClass)}
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
    const { children, className } = this.props;

    return (
      <FlexBox className={classnames(cssClass.CONTAINER, className)} column>
        {React.Children.map(children, option => this._renderOption(option))}
      </FlexBox>
    );
  }
}
