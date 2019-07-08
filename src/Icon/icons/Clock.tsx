import * as React from "react";

export default function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="46px"
      height="46px"
      viewBox="0 0 46 46"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {/* Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch */}
      <title>clock</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id="Artboards"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
      >
        <g id="clock" strokeWidth={2} stroke="#62748C">
          <g id="ui-48px-outline-2_time" transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <circle id="Oval" fill="#BCCEFF" cx={22} cy={22} r={22} />
              <polyline id="Shape" points="22 10 22 22 34 22" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
