import * as PropTypes from "prop-types";
import * as React from "react";

import "./Heading.less";

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * TODO: Add short description.
 */
export default class Heading extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const {children, className} = this.props;

    return (
      <h1 className={className}>
        {children}
      </h1>
    );
  }
}
