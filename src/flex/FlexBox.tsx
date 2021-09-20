import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Values } from "../utils/types";

import ContentAlign from "./ContentAlign";
import FlexItem, { Props as FlexItemProps } from "./FlexItem";
import ItemAlign from "./ItemAlign";
import Justify from "./Justify";

import "../less/flex.less";

export interface Props extends FlexItemProps {
  alignContent?: "around" | "between" | "center" | "end" | "start" | "stretch";
  alignItems?: Values<typeof ItemAlign>;
  children?: React.ReactNode;
  className?: string;
  column?: boolean;
  inline?: boolean;
  justify?: Values<typeof Justify>;
  wrap?: boolean;
  [additionalProp: string]: any;
}

export const cssClass = {
  FLEXBOX: "flexbox",
  COLUMN: "flex--direction--column",
  FLEXBOX_INLINE: "flexbox--inline",
  WRAP: "flex--wrap",

  alignContent: (value) => `content--${value}`,
  alignItems: (value) => `items--${value}`,
  justify: (value) => `justify--${value}`,
};

export default function FlexBox({
  alignContent,
  alignItems,
  children,
  className,
  column = false,
  inline = false,
  justify,
  wrap = false,
  ...additionalProps
}: Props) {
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
      tabIndex={0}
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
