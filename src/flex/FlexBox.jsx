import _ from "lodash";
import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

import ContentAlign from "./ContentAlign";
import FlexItem from "./FlexItem";
import ItemAlign from "./ItemAlign";
import Justify from "./Justify";

import "../less/flex.less";

let TYPE_ANY;

export default function FlexBox({
  alignContent = "",
  alignItems = "",
  children = TYPE_ANY,
  className = "",
  column = false,
  inline = false,
  justify = "",
  wrap = false,
  ...additionalProps
}) {
  const { cssClass } = FlexBox;

  return (
    <FlexItem
      className={classnames(
        inline ? cssClass.FLEXBOX_INLINE : cssClass.FLEXBOX,
        column && cssClass.COLUMN,
        alignContent && cssClass.alignContent(alignContent),
        alignItems && cssClass.alignItems(alignItems),
        justify && cssClass.justify(justify),
        wrap && cssClass.WRAP,
        className,
      )}
      {...additionalProps}
    >
      {children}
    </FlexItem>
  );
}

FlexBox.propTypes = {
  ...FlexItem.propTypes,
  alignContent: PropTypes.oneOf(_.values(ContentAlign)),
  alignItems: PropTypes.oneOf(_.values(ItemAlign)),
  children: PropTypes.node,
  className: PropTypes.string,
  column: PropTypes.bool,
  inline: PropTypes.bool,
  justify: PropTypes.oneOf(_.values(Justify)),
  wrap: PropTypes.bool,
};

FlexBox.defaultProps = {
  component: "div",
};

FlexBox.cssClass = {
  FLEXBOX: "flexbox",
  COLUMN: "flex--direction--column",
  FLEXBOX_INLINE: "flexbox--inline",
  WRAP: "flex--wrap",

  alignContent: value => `content--${value}`,
  alignItems: value => `items--${value}`,
  justify: value => `justify--${value}`,
};
