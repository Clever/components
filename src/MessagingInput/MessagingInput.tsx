import * as React from "react";
import { useRef, useImperativeHandle, useState } from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { TextArea, Button, FlexBox, ItemAlign, Checkbox } from "../index";
import KeyCode from "../utils/KeyCode";

import "./MessagingInput.less";

function cssClass(element: string) {
  return `MessagingInput--${element}`;
}

interface Props {
  attachments?: React.ReactNode[];
  className?: string;
  checkbox?: {
    isChecked: boolean;
    isVisible: boolean;
    label: React.ReactNode;
    onChange: (value: boolean) => void;
  };
  disableSendButton?: boolean;
  label?: string;
  newlineOnEnter?: boolean;
  onBlur?: () => void;
  onChange: (newValue: string) => void;
  onFocus?: () => void;
  onReplyCancel?: () => void;
  onSubmit: (message: string) => void;
  placeholder?: string;
  replyTo?: React.ReactNode;
  showReturnKeyInstructions?: boolean;
  showUploadAttachmentButton?: boolean;
  store?: (file, callbacks) => void;
  value: string;

  // Allows overriding the text with a translation
  sendButtonText?: string;
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
    attachments,
    checkbox,
    className,
    disableSendButton,
    label,
    newlineOnEnter,
    onBlur,
    onChange,
    onFocus,
    onReplyCancel,
    onSubmit,
    placeholder = "Send a message",
    replyTo,
    sendButtonText = "Send",
    showReturnKeyInstructions,
    showUploadAttachmentButton,
    store,
    value,
  } = props;
  const textAreaRef = useRef<TextArea>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    },
  }));

  const attachmentsArePresent = attachments?.length > 0;
  const [isInputActive, setIsInputActive] = useState(false);

  // Update this if relevant styling changes and this heuristic no longer holds
  const hasMultiLineText = textAreaRef.current?.textAreaHeight() > 40;

  return (
    <FlexBox
      className={cx(
        cssClass("Container"),
        showUploadAttachmentButton && cssClass("ShowUploadAttachmentButton"),
        className,
      )}
      column
      alignItems={ItemAlign.START}
    >
      <FlexBox className={cssClass("InnerContainer")}>
        <FlexBox column className={cssClass("InnerContainer--Content")}>
          {(label || checkbox) && (
            <FlexBox alignItems="center" className={cssClass("LabelAndCheckbox--Container")} grow>
              {label && (
                <label className={cssClass("LabelAndCheckbox--Label")} htmlFor={TEXT_FIELD_NAME}>
                  {label}
                </label>
              )}
              {checkbox?.isVisible && (
                <Checkbox
                  className={cssClass("LabelAndCheckbox--Checkbox")}
                  checked={checkbox.isChecked}
                  onChange={({ checked }) => checkbox.onChange(checked)}
                >
                  {checkbox.label}
                </Checkbox>
              )}
            </FlexBox>
          )}
          {replyTo && (
            <div
              className={cx(
                cssClass("Reply--Container"),
                isInputActive && cssClass("Reply--Container--WithActiveInput"),
              )}
            >
              <div className={cssClass("Reply--Content")}>
                {replyTo}
                {/* only show reply cancel button if cancel callback provided */}
                {onReplyCancel && (
                  <button
                    role="button"
                    className={cssClass("Reply--CloseButton")}
                    onClick={onReplyCancel}
                    aria-label="Cancel reply"
                  >
                    <FontAwesome
                      aria-hidden="true"
                      name="times"
                      className={cssClass("Reply--CloseIcon")}
                    />
                  </button>
                )}
              </div>
            </div>
          )}
          <TextArea
            ref={textAreaRef}
            className={cx(
              cssClass("TextField"),
              replyTo && cssClass("TextField--WithReply"),
              attachmentsArePresent && cssClass("TextField--WithAttachments"),
              hasMultiLineText && cssClass("TextField--MultiLine"),
            )}
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
                if (!isMessageSendDisabled(disableSendButton, value, attachments)) {
                  onSubmit(value.trim());
                }
              }
            }}
            placeholder={placeholder}
            onBlur={() => {
              setIsInputActive(false);
              if (onBlur) {
                onBlur();
              }
            }}
            onFocus={() => {
              setIsInputActive(true);
              if (onFocus) {
                onFocus();
              }
            }}
            autoResize
            // The field starts with `rows + 1` rows, so
            //  passing in 0 gets us the desired starting height.
            rows={0}
            showUploadAttachmentButton={showUploadAttachmentButton}
            storeUpload={store}
            fileUploadCustomIcon={<MessagingAttachmentIcon />}
            uploads={attachments?.length > 0 && formUploadedAttachments(attachments)}
          />
        </FlexBox>
        <Button
          className={cssClass("SendButton")}
          type="primary"
          value={
            <FlexBox alignItems="center">
              <FontAwesome aria-hidden="true" name="paper-plane" />
              <span className={cssClass("SendText")}>{sendButtonText}</span>
            </FlexBox>
          }
          disabled={isMessageSendDisabled(disableSendButton, value, attachments)}
          onClick={() => onSubmit(value.trim())}
          ariaLabel={sendButtonText}
        />
      </FlexBox>
      {formReturnKeyInstructionsLabel(showReturnKeyInstructions, value)}
    </FlexBox>
  );
};

function isMessageSendDisabled(
  disableSendButton: boolean,
  value: string,
  attachments: React.ReactNode[],
) {
  // disableSendButton boolean handles the case of unsendable invalid attachments
  if (disableSendButton) {
    return true;
  } else if (value.trim() === "" && (!attachments || attachments.length === 0)) {
    return true;
  }
  return false;
}

function formUploadedAttachments(attachments: React.ReactNode[]) {
  return <FlexBox className={cssClass("UploadedAttachments")}>{attachments}</FlexBox>;
}

function formReturnKeyInstructionsLabel(showReturnKeyInstructions: boolean, value: string) {
  // If showReturnKeyInstructions is not set, return undefined
  if (!showReturnKeyInstructions) {
    return undefined;
  }

  // If nothing is in the input, take up space with no text
  if (!value.trim()) {
    return <div className={cssClass("InstructionsLabel--spacer")} />;
  }

  return (
    <label htmlFor={TEXT_FIELD_NAME} className={cssClass("InstructionsLabel")}>
      <span className={cssClass("InstructionsLabel--bold")}>Return</span> to send
      <span
        className={cx(cssClass("InstructionsLabel--bold"), cssClass("InstructionsLabel--last"))}
      >
        Shift + Return
      </span>{" "}
      to add a new line
    </label>
  );
}

const MessagingAttachmentIcon = () => {
  return (
    <svg
      className="FileInput--Icon"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="4" />
      <path
        d="M7 21.5805C7 22.5504 7.33857 23.3628 8.01571 24.0177C8.69286 24.6726 9.53286 25 10.5357 25C11.6929 25 12.7 24.5855 13.5571 23.7565L23.5471 14.1073C24.5157 13.154 25 12.0308 25 10.7376C25 9.4195 24.5286 8.30039 23.5857 7.38024C22.6429 6.46008 21.49 6 20.1271 6C18.7729 6 17.6029 6.46837 16.6171 7.40511L8.83857 14.9404C8.75286 15.0233 8.71 15.1145 8.71 15.214C8.71 15.3466 8.84286 15.5414 9.10857 15.7984C9.36571 16.0471 9.56286 16.1715 9.7 16.1715C9.81143 16.1715 9.91 16.13 9.99571 16.0471L17.7871 8.49935C18.4643 7.86104 19.24 7.54189 20.1143 7.54189C21.0229 7.54189 21.79 7.85275 22.4157 8.47448C23.0414 9.0962 23.3543 9.84642 23.3543 10.7251C23.3543 11.5956 23.0286 12.3458 22.3771 12.9758L12.4 22.6374C11.86 23.1597 11.2386 23.4208 10.5357 23.4208C9.98714 23.4208 9.53286 23.2467 9.17286 22.8986C8.81286 22.5504 8.63286 22.111 8.63286 21.5805C8.63286 20.9007 8.90286 20.2997 9.44286 19.7775L16.9129 12.553C17.1357 12.3541 17.3929 12.2546 17.6843 12.2546C17.9329 12.2546 18.1386 12.3333 18.3014 12.4908C18.4643 12.6483 18.5457 12.8473 18.5457 13.0877C18.5457 13.353 18.4386 13.5975 18.2243 13.8213L12.9529 18.9195C12.8671 19.0024 12.8243 19.0936 12.8243 19.1931C12.8243 19.3257 12.9571 19.5205 13.2229 19.7775C13.4886 20.0345 13.69 20.163 13.8271 20.163C13.93 20.163 14.0243 20.1215 14.11 20.0386L19.3814 14.9404C19.9214 14.4348 20.1914 13.8172 20.1914 13.0877C20.1914 12.4079 19.9471 11.8318 19.4586 11.3593C18.97 10.8868 18.3743 10.6505 17.6714 10.6505C16.9171 10.6505 16.2786 10.9116 15.7557 11.4339L8.28572 18.6584C7.42857 19.4708 7 20.4448 7 21.5805Z"
        fill="#474C5E"
      />
    </svg>
  );
};

export const MessagingInput = React.forwardRef(MessagingInputRenderFunction);
