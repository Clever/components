import classnames from "classnames";
import * as React from "react";

import "./InfoPanel.less";


const CLASSNAMES = {
  CONTAINER: "InfoPanel",
  CONTENT: "InfoPanel--content",
  HEADER: "InfoPanel--header",
  FOOTER: "InfoPanel--footer",
  TITLE: "InfoPanel--title",
};

/**
 * Base presentational component for the displaying information in  paneled format.
 */
export default function InfoPanel({children, className, title, footer}) {
  return (
    <div className={classnames(CLASSNAMES.CONTAINER, className)}>
      <div className={CLASSNAMES.HEADER}>
        <h4 className={CLASSNAMES.TITLE}>
          {title}
        </h4>
      </div>
      <div className={CLASSNAMES.CONTENT}>
        {children}
      </div>
      {footer && (
        <div className={CLASSNAMES.FOOTER}>
          {footer}
        </div>
      )}
    </div>
  );
}

InfoPanel.propTypes = {
  children:  React.PropTypes.node,
  className:  React.PropTypes.string,
  title:  React.PropTypes.string.isRequired,
  footer:  React.PropTypes.node,
};
