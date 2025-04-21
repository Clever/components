import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";

import "./ExpandableContainer.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  isExpanded?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  title: React.ReactNode;
}

const cssClass = {
  CONTAINER: "ExpandableContainer--container",
  HEADER: "ExpandableContainer--header",
  CONTENT: "ExpandableContainer--content",
  EXPAND_ICON: "ExpandableContainer--expandIcon",
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
      <Button
        className={cssClass.HEADER}
        type="linkPlain"
        onClick={onClick}
        aria-expanded={isExpanded}
      >
        <FlexBox tabIndex={-1} alignItems="center">
          {title}
          <FlexItem grow />
          <FontAwesome
            className={cssClass.EXPAND_ICON}
            name={isExpanded ? "chevron-down" : "chevron-right"}
          />
        </FlexBox>
      </Button>

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
