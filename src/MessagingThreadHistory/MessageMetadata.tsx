import * as React from "react";
import * as classNames from "classnames";
import * as moment from "moment";

import "./MessageMetadata.less";

function cssClass(element: string) {
  return `MessageMetadata--${element}`;
}

interface Props {
  className?: string;
  placement: "left" | "right" | "center";
  timestamp?: Date;
  showReadStatus?: boolean;
  children: React.ReactNode;
}

export const MessageMetadata: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, placement, timestamp, showReadStatus, children } = props;
  return (
    <div ref={ref} className={cssClass("Message--container")}>
      <div className={classNames(cssClass(`Message--${placement}`), className)}>
        {children}
        {timestamp && (
          <span className={cssClass(`Timestamp--${placement}`)}>
            {_formatDateForTimestamp(timestamp)}
          </span>
        )}
      </div>
      {showReadStatus && <div className={cssClass("ReadReceipt")}>Read</div>}
    </div>
  );
});

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
function _formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}
