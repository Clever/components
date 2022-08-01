import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { FlexBox, FlexItem } from "../flex";

import "./AlertMessage.less";

function cssClass(element: string) {
  return `AlertMessage--${element}`;
}

interface Props {
  icon: string;
  messageText: string;
}

export const AlertMessage: React.FC<Props> = ({ icon, messageText }: Props) => {
  return (
    <FlexBox className={cssClass("Container")} role={"row"}>
      <FontAwesome aria-hidden="true" name={icon} size="lg" />
      <FlexItem role={"gridcell"} className={cssClass("Message")} grow>
        {messageText}
      </FlexItem>
    </FlexBox>
  );
};
