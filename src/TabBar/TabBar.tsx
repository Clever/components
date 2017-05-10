import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import MorePropTypes from "../utils/MorePropTypes";
import Tab from "./Tab";
import {FlexBox, Justify} from "../flex";

import "./TabBar.less";


const CLASSNAMES = {
  CONTAINER: "TabBar",

  size: s => `TabBar--${s}`,
};

export default function TabBar({children, className, justify, size}) {
  return (
    <FlexBox
      className={classnames(CLASSNAMES.CONTAINER, CLASSNAMES.size(size), className)}
      justify={justify}
    >
      {children}
    </FlexBox>
  );
}

export {default as Tab} from "./Tab";

export const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

TabBar.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Tab)),
  className:  React.PropTypes.string,
  justify:  React.PropTypes.oneOf(_.values(Justify)),
  size:  React.PropTypes.oneOf(_.values(SIZES)),
};

TabBar.defaultProps = {
  justify: Justify.START,
  size: SIZES.MEDIUM,
};
