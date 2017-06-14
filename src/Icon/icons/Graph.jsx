import React from "react";

export default function Graph(props) {
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
      <title>line-chart</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id="Artboards"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g id="line-chart" strokeWidth={2} stroke="#4FA97B">
          <g id="Group-2" transform="translate(1.000000, 3.000000)">
            <g id="business-48px-outline_stock">
              <rect
                id="Rectangle-path"
                fill="#85EBB6"
                x={0}
                y={0}
                width={30}
                height={40}
                rx={2}
              />
              <rect
                id="Rectangle-path"
                fill="#FFFFFF"
                x={30}
                y={0}
                width={14}
                height={40}
                rx={2}
              />
              <g id="Group">
                <polyline
                  id="Shape"
                  strokeLinejoin="round"
                  points="0 20 4 23 8 16 14 27 18 19 22 22 26.2 17.2"
                />
                <path d="M30,20 L30,40" id="Shape" />
                <path d="M30,0 L30,12" id="Shape" />
                <circle id="Oval" fill="#FFFFFF" cx={30} cy={16} r={4} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
