import * as React from "react";

export default function LifeFloat(props) {
  return (
    <svg
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="85.816%" y2="83.236%" id="a">
          <stop stopColor="#FDFDFE" offset="0%" />
          <stop stopColor="#EAEAED" offset="100%" />
        </linearGradient>
        <path
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.381-6.857a9.524 9.524 0 1 0 0-19.048 9.524 9.524 0 0 0 0 19.048z"
          id="b"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.381-6.857a9.524 9.524 0 1 0 0-19.048 9.524 9.524 0 0 0 0 19.048z"
            fill="#000"
          />
          <path
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.381-6.857a9.524 9.524 0 1 0 0-19.048 9.524 9.524 0 0 0 0 19.048z"
            fill="url(#a)"
          />
        </g>
        <mask id="c" fill="#fff">
          <use xlinkHref="#b" />
        </mask>
        <g fill="#E02B3A" fillRule="nonzero" mask="url(#c)">
          <path d="M6.095-3.616l10.677 20.092-21.523-6.212z" />
          <path d="M35.101 3.753L16.595 16.231l17.637 6.651z" />
          <path d="M22.215 36.188l-5.55-19.957-14.66 14.162z" />
        </g>
      </g>
    </svg>
  );
}
