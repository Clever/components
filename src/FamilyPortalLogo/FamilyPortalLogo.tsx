import * as classnames from "classnames";
import * as React from "react";

import "./FamilyPortalLogo.less";

interface Props {
  className?: string;
  svgClassName?: string;
}

export const FamilyPortalLogo: React.FC<Props> = ({ className, svgClassName }: Props) => {
  return (
    <div className={classnames("dewey--FamilyPortalLogo", className)}>
      <svg
        aria-labelledby="dewey--FamilyPortalLogo--title"
        className={classnames("dewey--FamilyPortalLogo--image", svgClassName)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 179 24"
      >
        <title id="dewey--FamilyPortalLogo--title">Clever Parents</title>
        <path
          fill="#436CF2"
          d="M92.669 22.811v-8.975h6.253c4.115 0 6.512-2.916 6.512-6.318 0-3.402-2.365-6.318-6.512-6.318h-8.1v21.611h1.847zm6.059-10.66h-6.06V2.885h6.06c2.883 0 4.762 1.911 4.762 4.633 0 2.69-1.879 4.633-4.762 4.633zm19.579 10.66V11.795c0-3.5-2.527-5.022-5.703-5.022-2.592 0-4.406.875-6.026 2.624l.939 1.167c1.426-1.62 2.949-2.3 4.925-2.3 2.301 0 4.18 1.263 4.18 3.596v3.175c-1.361-1.523-3.143-2.236-5.314-2.236-2.721 0-5.475 1.782-5.475 5.184 0 3.37 2.786 5.217 5.475 5.217 2.171 0 3.921-.713 5.314-2.236v1.847h1.685zm-6.415-.94c-2.56 0-4.277-1.652-4.277-3.855 0-2.236 1.717-3.888 4.277-3.888 1.879 0 3.628.713 4.73 2.17v3.435c-1.102 1.426-2.851 2.139-4.73 2.139zm10.61.94V11.406c.713-1.36 2.851-2.786 4.439-2.786.324 0 .551 0 .843.064V6.838c-2.171 0-3.953 1.263-5.282 3.013V7.16h-1.685v15.65h1.685zm12.454.389c2.592 0 4.569-.907 6.124-2.527l-.875-1.102c-1.328 1.426-3.143 2.17-5.119 2.17-3.694 0-5.962-2.818-6.124-6.22h13.09v-.454c0-4.536-2.624-8.294-7.387-8.294-4.342 0-7.517 3.661-7.517 8.197 0 4.828 3.24 8.23 7.808 8.23zm5.379-9.007h-11.373c.13-2.722 1.977-5.962 5.67-5.962 3.921 0 5.671 3.305 5.703 5.962zm15.727 8.618V11.86c0-3.532-1.75-5.087-4.925-5.087-2.268 0-4.504 1.393-5.638 2.754V7.162h-1.685v15.65h1.685V10.984c1.004-1.426 3.078-2.69 5.087-2.69 2.268 0 3.791.908 3.791 3.921V22.81h1.685zm6.384.389c1.296 0 2.041-.389 2.657-.972l-.648-1.296c-.357.389-1.005.745-1.75.745-1.102 0-1.62-.875-1.62-2.138V8.652h3.175v-1.49h-3.175V2.885h-1.717v4.277h-2.592v1.49h2.592v11.146c0 2.138 1.004 3.402 3.078 3.402zm9.862 0c3.921 0 5.865-2.074 5.865-4.6 0-6.027-9.85-3.63-9.85-7.55 0-1.62 1.458-2.852 3.888-2.852 2.074 0 3.759.843 4.666 2.074l.939-1.199c-1.134-1.263-2.916-2.3-5.605-2.3-3.532 0-5.573 1.944-5.573 4.341 0 5.638 9.882 3.208 9.882 7.485 0 1.814-1.555 3.175-4.179 3.175-2.204 0-4.05-1.037-5.055-2.3l-1.004 1.231c1.555 1.75 3.499 2.495 6.026 2.495z"
        ></path>
        <path
          fill="#436CF2"
          fillRule="evenodd"
          d="M.016 11.656C.016 5.39 4.665.31 11.328.31c4.09 0 6.54 1.371 8.553 3.366L16.845 7.2c-1.673-1.528-3.378-2.463-5.547-2.463-3.657 0-6.292 3.055-6.292 6.795 0 3.803 2.573 6.92 6.292 6.92 2.48 0 3.998-.997 5.702-2.556l3.038 3.086c-2.232 2.4-4.711 3.896-8.895 3.896-6.385 0-11.126-4.956-11.126-11.221zM20.47.075h4.71V22.83h-4.71V.075zm13.45 9.212c-1.952 0-3.223 1.402-3.595 3.553h7.097c-.279-2.12-1.518-3.553-3.502-3.553zm8.027 6.515h-11.56c.465 2.15 1.953 3.272 4.06 3.272 1.58 0 2.727-.498 4.03-1.714l2.695 2.4c-1.55 1.933-3.78 3.117-6.787 3.117-4.99 0-8.678-3.522-8.678-8.634v-.062c0-4.77 3.378-8.697 8.213-8.697 5.548 0 8.09 4.333 8.09 9.07v.063c0 .468-.032.748-.063 1.185zm9.022 6.989h-4.277L40.152 5.96h4.99l3.72 11.19 3.75-11.19h4.896l-6.54 16.832zM63.612 9.287c-1.952 0-3.223 1.402-3.595 3.553h7.097c-.279-2.12-1.518-3.553-3.502-3.553zm8.027 6.515H60.08c.465 2.15 1.953 3.272 4.06 3.272 1.58 0 2.727-.498 4.03-1.714l2.695 2.4c-1.55 1.933-3.78 3.117-6.787 3.117-4.99 0-8.678-3.522-8.678-8.634v-.062c0-4.77 3.378-8.697 8.213-8.697 5.548 0 8.09 4.333 8.09 9.07v.063c0 .468-.032.748-.063 1.185zm10.227-5.035c-3.13 0-5.052 1.901-5.052 5.891v6.172h-4.71V6.122h4.71V9.49c.961-2.307 2.51-3.803 5.3-3.679v4.957h-.248z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
