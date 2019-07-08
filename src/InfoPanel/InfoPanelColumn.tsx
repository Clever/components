import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

export interface Props {
  children: React.ReactNode;
  className?: string;
}

export const cssClass = {
  CONTAINER: "InfoPanelColumn",
};

export default function InfoPanelColumn({ children, className }: Props) {
  return <div className={classnames(cssClass.CONTAINER, className)}>{children}</div>;
}

InfoPanelColumn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
