import * as React from "react";
import * as cx from "classnames";

import { TextArea, Button, FlexBox, ItemAlign } from "../index";
import KeyCode from "../utils/KeyCode";

import "./MessagingInput.less";

function cssClass(element: string) {
  return `MessagingInput--${element}`;
}

interface Props {
  className?: string;
  newlineOnEnter?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  // onSubmit accepts a value rather than submitting the current message value
  //  so that we may trim it precisely before the send happens. Otherwise,
  //  the consumer would have to handle the trim themselves.
  onSubmit: (message: string) => void;
  onBlur?: () => void;
}

export interface MessagingInputHandle {
  focus(): void;
}

const MessagingInputRenderFunction: React.ForwardRefRenderFunction<MessagingInputHandle, Props> = (
  props,
  ref,
) => {
  const { className, newlineOnEnter, value, onChange, onSubmit, onBlur } = props;
  const textAreaRef = React.useRef<TextArea>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    },
  }));

  return (
    <FlexBox className={cx(cssClass("Container"), className)} alignItems={ItemAlign.END}>
      <TextArea
        ref={textAreaRef}
        className={cssClass("TextField")}
        name="newMessage"
        placeholder="Message"
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        onKeyDown={e => {
          // Shift+Enter is a line-break.
          // Enter alone is an attempt to Send, unless prop is
          //  explicitly set to have enter be a newline.
          if (e.key === KeyCode.ENTER && !e.shiftKey && !newlineOnEnter) {
            e.preventDefault();
            // If something other than whitespace is in the input area, Send the message.
            if (value.trim() !== "") {
              onSubmit(value.trim());
            }
          }
        }}
        onBlur={onBlur}
        autoResize
        // The field starts with `rows + 1` rows, so
        //  passing in 0 gets us the desired starting height.
        rows={0}
      />
      <Button
        className={cssClass("SendButton")}
        type="primary"
        value={
          <>
            <img
              className={cssClass("SendIcon")}
              alt="messaging settings"
              src={require("./arrow_send.svg")}
            />
            <span className={cssClass("SendText")}>Send</span>
          </>
        }
        // Disable the Send if nothing but whitespace is in the input field.
        disabled={!value.trim()}
        onClick={() => onSubmit(value.trim())}
      />
    </FlexBox>
  );
};

export const MessagingInput = React.forwardRef(MessagingInputRenderFunction);
