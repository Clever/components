import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import ItemAlign from "./ItemAlign";

import "../less/flex.less";


const CLASSNAMES = {
  GROW: "flex--grow",
  alignSelf: value => `self--${value}`,
};

export default function FlexItem({
  alignSelf,
  children,
  className,
  component: Wrapper,
  grow,
  ...additionalProps,
}) {
  return (
    <Wrapper
      className={classnames(
        alignSelf && CLASSNAMES.alignSelf(alignSelf),
        grow && CLASSNAMES.GROW,
        className
      )}
      {...additionalProps}
    >
      {children}
    </Wrapper>
  );
}

FlexItem.propTypes = {
  alignSelf:  React.PropTypes.oneOf(_.values(ItemAlign)),
  children:  React.PropTypes.node,
  className:  React.PropTypes.string,
  component:  React.PropTypes.any,
  grow:  React.PropTypes.bool,
};

FlexItem.defaultProps = {
  component: "div",
};
