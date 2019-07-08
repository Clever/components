import * as React from "react";
import classnames from "classnames";
import * as PropTypes from "prop-types";

const cssClass = {
  CONTAINER: "CloseIcon--container",
};

CloseIcon.propTypes = {
  className: PropTypes.string,
};

export function CloseIcon(props) {
  const { className } = props;
  return (
    <svg
      className={classnames(cssClass.CONTAINER, className)}
      // Prevent IE11 from focusing on the element.
      focusable="false"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.934 7.916c.04.052.066.105.066.171a.278.278 0 0 1-.066.172L8.259 9.934a.278.278 0 0 1-.172.066.278.278 0 0 1-.171-.066L5 7.018 2.084 9.934a.278.278 0 0 1-.171.066.278.278 0 0 1-.172-.066L.066 8.259A.278.278 0 0 1 0 8.087c0-.066.026-.119.066-.171L2.982 5 .066 2.084A.278.278 0 0 1 0 1.913c0-.066.026-.119.066-.172L1.741.066A.278.278 0 0 1 1.913 0c.066 0 .119.026.171.066L5 2.982 7.916.066A.278.278 0 0 1 8.087 0c.066 0 .119.026.172.066l1.675 1.675c.04.053.066.106.066.172a.278.278 0 0 1-.066.171L7.018 5l2.916 2.916z"
        fill="#474C5E"
        fillRule="evenodd"
      />
    </svg>
  );
}
