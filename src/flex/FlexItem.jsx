import _ from "lodash";
import classnames from "classnames";
import React, {PropTypes} from "react";

import ItemAlign from "./ItemAlign";

import "../less/flex.less";


export default function FlexItem({
  alignSelf,
  children,
  className,
  component: Wrapper,
  grow,
  noShrink,
  ...additionalProps,
}) {
  const {cssClass} = FlexItem;

  return (
    <Wrapper
      className={classnames(
        alignSelf && cssClass.alignSelf(alignSelf),
        grow && cssClass.GROW,
        noShrink && cssClass.NO_SHRINK,
        className
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
  noShrink: PropTypes.bool,
};

FlexItem.defaultProps = {
  component: "div",
};

FlexItem.cssClass = {
  GROW: "flex--grow",
  NO_SHRINK: "flex--noShrink",

  alignSelf: value => `self--${value}`,
};
