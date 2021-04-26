import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { FlexBox, FlexItem } from "src/flex";

import "./ExpandableContainer.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  isExpanded: boolean;
  onToggleExpansion: React.MouseEventHandler<HTMLDivElement>;
  title?: React.ReactNode;
}

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isExpanded: PropTypes.bool,
  onToggleExpansion: PropTypes.func.isRequired,
  title: PropTypes.node,
};

const cssClass = {
  CONTAINER: "ExpandableContainer--container",
  TITLE: "ExpandableContainer--title",
  CONTENT: "ExpandableContainer--content",
};

export default class ExpandableContainer extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const { children, className, isExpanded, onToggleExpansion, title } = this.props;
    return (
      <FlexBox column className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox alignItems="center" className={cssClass.TITLE} onClick={onToggleExpansion}>
          {title}
          <FlexItem grow />
          <FontAwesome name={isExpanded ? "chevron-down" : "chevron-right"} />
        </FlexBox>
        {isExpanded && <div className={cssClass.CONTENT}>{children}</div>}
      </FlexBox>
    );
  }
}
