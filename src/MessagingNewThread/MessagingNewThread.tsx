import * as React from "react";
import * as classNames from "classnames";

import { FlexBox, FlexItem } from "../index";

import "./MessagingNewThread.less";
import { DraftPencilIcon } from "src/MessagingThreadListItem/DraftPencilIcon";

const cssClasses = {
  NEWTHREAD: "NewThread",
  NEWTHREAD_SELECTED: "NewThread--selected",
  NEWTHREAD_NAME: "NewThread--Name",
  NEWTHREAD_ICON: "NewThread--Icon",
};

type Props = {
  className?: string;
  title: string;
  icon: React.ReactNode;
  hasDraft: boolean;
  selected: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

export const MessagingNewThread: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, title, icon, hasDraft, selected, onClick } = props;
  return (
    <div ref={ref}>
      <FlexBox
        className={classNames(
          cssClasses.NEWTHREAD,
          selected && cssClasses.NEWTHREAD_SELECTED,
          className,
        )}
        onClick={onClick}
      >
        <div className={cssClasses.NEWTHREAD_ICON}>{icon}</div>
        <FlexItem grow className={cssClasses.NEWTHREAD_NAME}>
          {title}
        </FlexItem>
        {hasDraft && (
          <div>
            <DraftPencilIcon />
          </div>
        )}
      </FlexBox>
    </div>
  );
});
