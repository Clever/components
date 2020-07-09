import * as React from "react";

import { TextArea, Button, FlexBox, ItemAlign } from "clever-components";

import "./MessageInput.less";

const cssClasses = {
  MESSAGEINPUT_TEXTFIELD: "MessageInput--TextField",
  MESSAGEINPUT_SENDBUTTON: "MessageInput--SendButton",
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

export const MessageInput: React.FC<Props & { ref?: React.Ref<TextArea> }> = React.forwardRef(
  (props, ref) => {
    const { className, recipientName, value, onChange, onSubmit, onBlur } = props;

    return (
      <FlexBox className={className} alignItems={ItemAlign.END}>
        <TextArea
          ref={ref}
          className={cssClasses.MESSAGEINPUT_TEXTFIELD}
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
          className={cssClasses.MESSAGEINPUT_SENDBUTTON}
          type="primary"
          value="Send"
          // Disable the Send if nothing but whitespace is in the input field.
          disabled={!value.trim()}
          onClick={() => onSubmit(value.trim())}
        />
      </FlexBox>
    );
  },
);
