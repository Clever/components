import classnames from "classnames";
import React, {PropTypes} from "react";


export default function InfoPanelColumn({children, className}) {
  const {cssClass} = InfoPanelColumn;

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      {children}
    </div>
  );
}

InfoPanelColumn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

InfoPanelColumn.cssClass = {
  CONTAINER: "InfoPanelColumn",
};
