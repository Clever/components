import _ from "lodash";
import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

import ItemAlign from "./ItemAlign";

import "../less/flex.less";


let TYPE_ANY;

export default function FlexItem({
  alignSelf = "",
  children = TYPE_ANY,
  className = "",
  component: Wrapper = "div",
  grow = false,
  ...additionalProps
}) {
  const {cssClass} = FlexItem;

  return (
    <Wrapper
      className={classnames(
        alignSelf && cssClass.alignSelf(alignSelf),
        grow && cssClass.GROW,
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
};

FlexItem.defaultProps = {
  component: "div",
};

FlexItem.cssClass = {
  GROW: "flex--grow",

  alignSelf: value => `self--${value}`,
};
