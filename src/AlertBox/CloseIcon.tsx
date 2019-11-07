import * as React from "react";

export interface Props extends React.SVGProps<SVGSVGElement> {}

export const CloseIcon = (props: Props) => (
  <svg width="1em" height="1em" viewBox="0 0 16 17" {...props}>
    <path
      d="M9.737 8.5l6.162 6.162c.193.194.19.51-.001.702l-1.034 1.034a.495.495 0 0 1-.702 0L8 10.238l-6.162 6.162a.499.499 0 0 1-.702-.001L.102 15.364a.495.495 0 0 1 0-.702L6.262 8.5.101 2.338a.499.499 0 0 1 .001-.702L1.136.602a.495.495 0 0 1 .702 0L8 6.762 14.162.601a.499.499 0 0 1 .702.001l1.034 1.034a.495.495 0 0 1 0 .702L9.738 8.5z"
      fill="#474C5E"
      fillRule="evenodd"
    />
  </svg>
);
