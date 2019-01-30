import * as PropTypes from "prop-types";
import * as React from "react";
import classnames from "classnames";

import "./Heading.less";

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // TODO: add prop types
};


/**
 * TODO: Add short description.
 */
export default class Heading extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const {level, children, className} = this.props;
    const HeadingTag : any = `h${level}`;
    const classes = classnames(
      `Heading--h${level}`,
      className
    );

    return (
      <HeadingTag className={classes}>
        {children}
      </HeadingTag>
    );
  }
}
