import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import { Button, Props as ButtonProps } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import FlexItem from "../flex/FlexItem";
import { Props as TooltipProps } from "../Tooltip/Tooltip";
import Tooltip from "../Tooltip/Tooltip";

import "./EditableInfoPanel.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: ButtonProps;
  tooltipProps?: EditableInfoPanelTooltipProps;
}

export interface EditableInfoPanelTooltipProps extends Omit<TooltipProps, "children"> {
  children?: React.ReactNode | null;
}

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  buttonProps: PropTypes.object,
  tooltipProps: PropTypes.object,
};

const cssClass = {
  CONTAINER: "EditableInfoPanel",
  HEADER: "EditableInfoPanel--header",
  CONTENT: "EditableInfoPanel--content",
};

export default class EditableInfoPanel extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const { title, className, children, onClick, buttonProps, tooltipProps } = this.props;

    const btn = (
      <Button
        {...{
          value: "Edit",
          size: "small",
          onClick,
          ...buttonProps,
        }}
      />
    );
    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER}>
          {title}
          <FlexItem grow />
          <FlexItem>
            {tooltipProps && (
              <Tooltip {...tooltipProps}>
                <span>{btn}</span>
              </Tooltip>
            )}
            {!tooltipProps && btn}
          </FlexItem>
        </FlexBox>
        <div className={cssClass.CONTENT}>{children}</div>
      </div>
    );
  }
}
