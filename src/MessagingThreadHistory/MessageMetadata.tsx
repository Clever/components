import * as React from "react";
import * as classNames from "classnames";
import * as FontAwesome from "react-fontawesome";
import { FlexBox } from "../";

import "./MessageMetadata.less";

function cssClass(element: string) {
  return `MessageMetadata--${element}`;
}

interface Props {
  className?: string;
  placement: "left" | "right" | "center" | "fullWidth";
  timestamp?: Date;
  readStatusText?: string;
  errorMsg?: string;
  children: React.ReactNode;
}

export const MessageMetadata: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, placement, readStatusText, children, errorMsg } = props;
  return (
    <div ref={ref} className={classNames(cssClass("Message--container"), className)}>
      <div className={cssClass(`Message--${placement}`)}>
        {children}
      </div>
      {readStatusText && <div className={cssClass("ReadReceipt")}>{readStatusText}</div>}
      {errorMsg && formErrorContainer(errorMsg)}
    </div>
  );
});



function formErrorContainer(errorMsg: React.ReactNode): JSX.Element {
  return (
    <FlexBox className={cssClass("Error")} grow alignItems="center" justify="start">
      <FontAwesome className={cssClass("Error--Icon")} name="exclamation-circle " />
      {errorMsg}
    </FlexBox>
  );
}
