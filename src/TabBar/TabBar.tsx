import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import MorePropTypes from "../utils/MorePropTypes";
import Tab from "./Tab";
import { FlexBox, Justify } from "../flex";

import "./TabBar.less";

export default function TabBar({ children, className, justify, size }) {
  const { cssClass } = TabBar;

  return (
    <FlexBox
      className={classnames(cssClass.CONTAINER, cssClass.size(size), className)}
      justify={justify}
    >
      {children}
    </FlexBox>
  );
}

TabBar.Tab = Tab;

TabBar.Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

TabBar.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Tab)),
  className: PropTypes.string,
  justify: PropTypes.oneOf(_.values(Justify)),
  size: PropTypes.oneOf(_.values(TabBar.Size)),
};

TabBar.defaultProps = {
  justify: Justify.START,
  size: TabBar.Size.MEDIUM,
};

TabBar.cssClass = {
  CONTAINER: "TabBar",

  size: s => `TabBar--${s}`,
};
