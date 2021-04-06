import * as React from "react";
import * as cx from "classnames";

import { TextArea, Button, FlexBox, ItemAlign } from "../index";
import KeyCode from "../utils/KeyCode";
import * as FontAwesome from "react-fontawesome";

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
  // optional content to display when replying to a message
  replyTo?: React.ReactNode;
  // optional callback for cancelling reply
  onReplyCancel?: () => void;
  /** Temporarily added to allow overriding the text with a translation. */
  sendButtonText?: string;
  /** Temporarily added to allow overriding the text with a translation. */
  labelText?: string;
  disableSendButton?: boolean;
}

export interface MessagingInputHandle {
  focus(): void;
}

const TEXT_FIELD_NAME = "newMessage";

const MessagingInputRenderFunction: React.ForwardRefRenderFunction<MessagingInputHandle, Props> = (
  props,
  ref,
) => {
  const {
    className,
    newlineOnEnter,
    value,
    onChange,
    onSubmit,
    onBlur,
    replyTo,
    onReplyCancel,
    sendButtonText = "Send",
    labelText = "Send a message",
    disableSendButton,
  } = props;
  const textAreaRef = React.useRef<TextArea>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    },
  }));

  return (
    <FlexBox className={cx(cssClass("Container"), className)} column alignItems={ItemAlign.START}>
      <label
        htmlFor={TEXT_FIELD_NAME}
        className={cssClass(replyTo ? "TextFieldLabelHidden" : "TextFieldLabel")}
      >
        {labelText}
      </label>
      <FlexBox className={cssClass("InnerContainer")}>
        <FlexBox column className={cx(cssClass("InnerContainer--Content"))}>
          {replyTo && (
            <FlexBox className={cssClass("Reply--Container")}>
              <FlexBox className={cssClass("Reply--Content")}>
                {replyTo}
                {/* only show reply cancel button if cancel callback provided */}
                {onReplyCancel && (
                  <button
                    role="button"
                    className={cssClass("Reply--CloseButton")}
                    onClick={onReplyCancel}
                  >
                    <FontAwesome name="times" className={cssClass("Reply--CloseIcon")} />
                  </button>
                )}
              </FlexBox>
            </FlexBox>
          )}
          <TextArea
            ref={textAreaRef}
            className={cssClass("TextField")}
            name={TEXT_FIELD_NAME}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onKeyDown={(e) => {
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
            placeholder={replyTo ? labelText : ""}
            onBlur={onBlur}
            autoResize
            // The field starts with `rows + 1` rows, so
            //  passing in 0 gets us the desired starting height.
            rows={0}
          />
        </FlexBox>
        <Button
          className={cssClass("SendButton")}
          type="primary"
          value={
            <>
              <img
                className={cssClass("SendIcon")}
                alt="Send message"
                src={require("./arrow_send.svg")}
              />
              <span className={cssClass("SendText")}>{sendButtonText}</span>
            </>
          }
          // Disable the Send if nothing but whitespace is in the input field. Also disable if it is manually disabled
          disabled={!value.trim() || disableSendButton}
          onClick={() => onSubmit(value.trim())}
        />
      </FlexBox>
    </FlexBox>
  );
};

export const MessagingInput = React.forwardRef(MessagingInputRenderFunction);
