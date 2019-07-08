import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

export default function InfoPanelColumn({ children, className }) {
  const { cssClass } = InfoPanelColumn;

  return <div className={classnames(cssClass.CONTAINER, className)}>{children}</div>;
}

InfoPanelColumn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

InfoPanelColumn.cssClass = {
  CONTAINER: "InfoPanelColumn",
};
