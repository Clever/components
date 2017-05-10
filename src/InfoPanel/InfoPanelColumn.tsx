import classnames from "classnames";
import * as React from "react";

const CLASSNAMES = {
  CONTAINER: "InfoPanelColumn",
};

export default function InfoPanelColumn({children, className}) {
  return (
    <div className={classnames(CLASSNAMES.CONTAINER, className)}>
      {children}
    </div>
  );
}

InfoPanelColumn.propTypes = {
  children:  React.PropTypes.node.isRequired,
  className:  React.PropTypes.string,
};
