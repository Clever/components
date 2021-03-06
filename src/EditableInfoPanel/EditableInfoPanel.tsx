import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";

import "./EditableInfoPanel.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

const cssClass = {
  CONTAINER: "EditableInfoPanel",
  HEADER: "EditableInfoPanel--header",
  CONTENT: "EditableInfoPanel--content",
};

export default class EditableInfoPanel extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const { title, children, className, onClick } = this.props;
    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER}>
          {title}
          <FlexItem grow />
          <FlexItem>
            <Button value="Edit" size="small" onClick={onClick} />
          </FlexItem>
        </FlexBox>
        <div className={cssClass.CONTENT}>{children}</div>
      </div>
    );
  }
}
