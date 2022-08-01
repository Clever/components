import * as React from "react";
import * as classNames from "classnames";
import * as FontAwesome from "react-fontawesome";
import { FlexBox } from "../";

import "./MessageMetadata.less";

function cssClass(element: string) {
  return `MessageMetadata--${element}`;
}

type PlacementOptions = "left" | "right" | "center" | "fullWidth";

interface Props {
  className?: string;
  placement: PlacementOptions;
  readStatusText?: string;
  errorMsg?: string;
  children: React.ReactNode;
}

export const MessageMetadata: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, placement, readStatusText, children, errorMsg } = props;
  return (
    <div ref={ref} className={classNames(cssClass("Message--container"), className)} role="row">
      <div role="gridcell" className={cssClass(`Message--${placement}`)}>
        {children}
      </div>
      {readStatusText && <div className={cssClass("ReadReceipt")}>{readStatusText}</div>}
      {errorMsg && formErrorContainer(errorMsg, placement)}
    </div>
  );
});

function formErrorContainer(errorMsg: React.ReactNode, placement: PlacementOptions): JSX.Element {
  return (
    <FlexBox
      className={classNames(cssClass("Error"), cssClass(`Error--${placement}`))}
      grow
      alignItems="center"
    >
      <div className={cssClass("ErrorContents")}>
        <FontAwesome className={cssClass("Error--Icon")} name="exclamation-circle " />
        {errorMsg}
      </div>
    </FlexBox>
  );
}
