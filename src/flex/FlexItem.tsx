import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Values } from "../utils/types";

import ItemAlign from "./ItemAlign";

import "../less/flex.less";

export interface Props {
  alignSelf?: Values<typeof ItemAlign>;
  children?: React.ReactNode;
  className?: string;
  component?: any;
  // TODO: It's theoretically possible to make this component generic and type these extra props, but it's a pain
  [additionalProp: string]: any;
  grow?: boolean;
}

export const cssClass = {
  GROW: "flex--grow",

  alignSelf: (value: string) => `self--${value}`,
};

export default function FlexItem({
  alignSelf,
  children,
  className,
  component: Wrapper = "div",
  grow = false,
  ...additionalProps
}: Props) {
  return (
    <Wrapper
      className={classnames(
        alignSelf && cssClass.alignSelf(alignSelf),
        grow && cssClass.GROW,
        className,
      )}
      {...additionalProps}
    >
      {children}
    </Wrapper>
  );
}

FlexItem.propTypes = {
  alignSelf: PropTypes.oneOf(_.values(ItemAlign)),
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.any,
  grow: PropTypes.bool,
};

FlexItem.defaultProps = {
  component: "div",
};
