import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import ContentAlign from "./ContentAlign";
import FlexItem from "./FlexItem";
import ItemAlign from "./ItemAlign";
import Justify from "./Justify";

import "../less/flex.less";


const CLASSNAMES = {
  FLEXBOX: "flexbox",
  COLUMN: "flex--direction--column",
  FLEXBOX_INLINE: "flexbox--inline",
  WRAP: "flex--wrap",

  alignContent: value => `content--${value}`,
  alignItems: value => `items--${value}`,
  justify: value => `justify--${value}`,
};

export default function FlexBox({
  alignContent,
  alignItems,
  children,
  className,
  column,
  inline,
  justify,
  wrap,
  ...additionalProps,
}) {
  return (
    <FlexItem
      className={classnames(
        inline ? CLASSNAMES.FLEXBOX_INLINE : CLASSNAMES.FLEXBOX,
        column && CLASSNAMES.COLUMN,
        alignContent && CLASSNAMES.alignContent(alignContent),
        alignItems && CLASSNAMES.alignItems(alignItems),
        justify && CLASSNAMES.justify(justify),
        wrap && CLASSNAMES.WRAP,
        className
      )}
      {...additionalProps}
    >
      {children}
    </FlexItem>
  );
}

FlexBox.propTypes = {
  ...FlexItem.propTypes,
  alignContent:  React.PropTypes.oneOf(_.values(ContentAlign)),
  alignItems:  React.PropTypes.oneOf(_.values(ItemAlign)),
  children:  React.PropTypes.node,
  className:  React.PropTypes.string,
  column:  React.PropTypes.bool,
  inline:  React.PropTypes.bool,
  justify:  React.PropTypes.oneOf(_.values(Justify)),
  wrap:  React.PropTypes.bool,
};

FlexBox.defaultProps = {
  component: "div",
};
