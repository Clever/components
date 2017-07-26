import classnames from "classnames";
import React, {PropTypes} from "react";

import "./InfoPanel.less";


/**
 * Base presentational component for the displaying information in  paneled format.
 */
export default function InfoPanel({children, className, title, footer}) {
  const {cssClass} = InfoPanel;

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div className={cssClass.HEADER}>
        <h4 className={cssClass.TITLE}>
          {title}
        </h4>
      </div>
      <div className={cssClass.CONTENT}>
        {children}
      </div>
      {footer && (
        <div className={cssClass.FOOTER}>
          {footer}
        </div>
      )}
    </div>
  );
}

InfoPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

InfoPanel.cssClass = {
  CONTAINER: "InfoPanel",
  CONTENT: "InfoPanel--content",
  HEADER: "InfoPanel--header",
  FOOTER: "InfoPanel--footer",
  TITLE: "InfoPanel--title",
};
