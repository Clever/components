import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import MorePropTypes from "../utils/MorePropTypes";
import Tab from "./Tab";
import { FlexBox, Justify } from "../flex";
import { ChildrenOf, Values } from "../utils/types";

import "./TabBar.less";

export interface Props {
  children?: ChildrenOf<typeof Tab>;
  className?: string;
  justify?: Values<typeof Justify>;
  size?: Values<typeof TabBar.Size>;
}

interface TabBarComponent extends React.FunctionComponent<Props> {
  Size: typeof Size;
  Tab: typeof Tab;
}

export const cssClass = {
  CONTAINER: "TabBar",

  size: (s) => `TabBar--${s}`,
};

const TabBar: TabBarComponent = function TabBar({ children, className, justify, size }) {
  return (
    <FlexBox
      className={classnames(cssClass.CONTAINER, cssClass.size(size), className)}
      justify={justify}
    >
      {children}
    </FlexBox>
  );
};

const Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

TabBar.Size = Size;
TabBar.Tab = Tab;

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

export default TabBar;
