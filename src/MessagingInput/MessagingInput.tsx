import * as React from "react";

import { TextArea, Button, FlexBox, ItemAlign } from "../index";

import "./MessagingInput.less";

const cssClasses = {
  TEXT_FIELD: "MessagingInput--TextField",
  SEND_BUTTON: "MessagingInput--SendButton",
};

interface Props {
  className?: string;
  recipientName: string;
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
  const { className, recipientName, value, onChange, onSubmit, onBlur } = props;
  const textAreaRef = React.useRef<TextArea>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    },
  }));

  return (
    <FlexBox className={className} alignItems={ItemAlign.END}>
      <TextArea
        ref={textAreaRef}
        className={cssClasses.TEXT_FIELD}
        name="newMessage"
        placeholder={`Message ${recipientName}`}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        onKeyDown={e => {
          // Shift+Enter is a line-break.
          // Enter alone is an attempt to Send.
          if (e.key === "Enter" && !e.shiftKey) {
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
        className={cssClasses.SEND_BUTTON}
        type="primary"
        value="Send"
        // Disable the Send if nothing but whitespace is in the input field.
        disabled={!value.trim()}
        onClick={() => onSubmit(value.trim())}
      />
    </FlexBox>
  );
};

export const MessagingInput = React.forwardRef(MessagingInputRenderFunction);
