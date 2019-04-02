import classnames from "classnames";
import React, { Component } from "react";
import * as PropTypes from "prop-types";

import { Button } from "src";

import "./View.less";

export default class View extends Component {
  componentWillMount() {
    document.title = `${View.WINDOW_TITLE_PREFIX}${this.props.title}`;
  }

  render() {
    const { cssClass } = View;
    const { children, className, sourcePath, subtitle, title } = this.props;

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <div className={cssClass.HEADER}>
          <h1 className={cssClass.TITLE}>
            {title}
            {sourcePath && (
              <Button
                className={cssClass.SOURCE_LINK}
                href={`//github.com/clever/components/tree/master/${sourcePath}`}
                target="_blank"
                type="linkPlain"
                value={<span className={classnames("fa fa-code", cssClass.SOURCE_ICON)} />}
              />
            )}
          </h1>
          {subtitle && <h3 className={cssClass.SUBTITLE}>{subtitle}</h3>}
        </div>
        <div className={cssClass.CONTENT}>{children}</div>
      </div>
    );
  }
}

View.WINDOW_TITLE_PREFIX = "Clever Design System | ";

View.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sourcePath: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

View.defaultProps = {
  jumpLinks: [],
};

View.cssClass = {
  CONTAINER: "View",
  CONTENT: "View--content",
  HEADER: "View--header",
  JUMP_LINK: "View--jumpLink",
  JUMP_LINKS: "View--jumpLinks",
  SOURCE_ICON: "View--sourceIcon",
  SOURCE_LINK: "View--sourceLink",
  SUBTITLE: "View--subtitle",
  TITLE: "View--title",
};
