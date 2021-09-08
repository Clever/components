import * as React from "react";
import { Button, Modal } from "src";
import "./DeleteMessageModal.less";

function cssClass(element: string) {
  return `DeleteMessageModal--${element}`;
}

type MessageType = "announcement" | "dm";

type Props = {
  messageType: MessageType;
  onClose: () => void;
  onConfirm: () => void;
  recipientUserType: "guardian" | "student";
};

export const DeleteMessageModal: React.FC<Props> = ({
  messageType,
  onClose,
  onConfirm,
  recipientUserType,
}: Props) => {
  // Show "parent" instead of "guardian" in the UI
  const recipientUserTypeCopy = recipientUserType === "guardian" ? "parent" : recipientUserType;
  return (
    <Modal className={cssClass("modal")} closeModal={onClose} title="Delete message?" width={545}>
      {_renderMainText(messageType, recipientUserTypeCopy)}
      <footer>
        <Button className={cssClass("button")} value="Cancel" type="link" onClick={onClose} />
        <Button
          className={cssClass("button")}
          value="Delete"
          type="destructive"
          onClick={onConfirm}
        />
      </footer>
    </Modal>
  );
};

function _renderMainText(
  messageType: MessageType,
  recipientUserTypeCopy: "parent" | "student",
): React.ReactNode {
  switch (messageType) {
    case "dm":
      return (
        <div className={cssClass("text")}>
          <p>
            If you delete this message, you and this {recipientUserTypeCopy} will no longer be able
            to see it. This cannot be undone.
          </p>
          <p>
            If you ever need a record of this deleted message, you can reach out to your Clever
            district administrator for a complete transcript of your messaging history.
          </p>
        </div>
      );
    case "announcement":
      return (
        <div className={cssClass("text")}>
          If you delete this announcement, you and your {recipientUserTypeCopy}s will no longer be
          able to see it. After it has been deleted you’ll still be able to see{" "}
          {recipientUserTypeCopy} replies in direct messages.
        </div>
      );
    default:
      return null;
  }
}
