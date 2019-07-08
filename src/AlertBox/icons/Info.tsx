import * as React from "react";

export interface Props extends React.SVGProps<SVGSVGElement> {}

export const InfoIcon: React.FunctionComponent<Props> = props => (
  <svg width={20} height={20} {...props}>
    <path
      d="M7.916 17.917C7.916 19.074 8.842 20 10 20a2.075 2.075 0 0 0 2.083-2.083H7.916zm12.06-1.922c.047-.162.024-.347-.092-.463l-3.634-3.61V6.25C16.25 2.8 13.449 0 10 0 6.55 0 3.75 2.8 3.75 6.25v5.671L.114 15.532c-.116.116-.139.301-.093.463.07.162.232.255.394.255h19.167a.428.428 0 0 0 .394-.255z"
      fill="#809DFF"
      fillRule="evenodd"
    />
  </svg>
);
