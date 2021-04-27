import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";

import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";

import "./ExpandableContainer.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  isExpanded?: boolean;
  onClick?: () => void;
  title?: React.ReactNode;
}

const cssClass = {
  CONTAINER: "ExpandableContainer--container",
  TITLE: "ExpandableContainer--title",
  CONTENT: "ExpandableContainer--content",
};

export const ExpandableContainer: React.FC<Props> = ({
  children,
  className,
  isExpanded,
  onClick,
  title,
}) => {
  return (
    <FlexBox column className={classnames(cssClass.CONTAINER, className)}>
      <FlexBox alignItems="center" className={cssClass.TITLE} onClick={onClick}>
        {title}
        <FlexItem grow />
        <FontAwesome name={isExpanded ? "chevron-down" : "chevron-right"} />
      </FlexBox>
      {isExpanded && <div className={cssClass.CONTENT}>{children}</div>}
    </FlexBox>
  );
};

ExpandableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.node,
};
