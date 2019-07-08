import * as React from "react";

export interface Props extends React.SVGProps<SVGSVGElement> {}

export const WarningIcon = (props: Props) => (
  <svg width={20} height={20} {...props}>
    <path
      d="M19.769 16.992L11.85 1.157A2.047 2.047 0 0 0 10 0c-.788 0-1.505.44-1.876 1.157L.207 16.992c-.3.648-.277 1.412.093 2.014A2.106 2.106 0 0 0 2.082 20h15.835c.717 0 1.389-.37 1.782-.995.37-.602.394-1.366.07-2.014zM8.749 5.417h2.5v7.084h-2.5V5.417zm1.25 12.5a1.66 1.66 0 0 1-1.666-1.666c0-.926.74-1.667 1.667-1.667.925 0 1.666.74 1.666 1.667A1.66 1.66 0 0 1 10 17.918z"
      fill="#F59520"
      fillRule="evenodd"
    />
  </svg>
);
