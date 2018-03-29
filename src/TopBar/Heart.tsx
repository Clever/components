import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Colors from "../utils/Colors";

const propTypes = {
  className: PropTypes.string,
};

const cssClass = {
  CONTAINER: "dewey--Heart",
  HEART: "dewey--Heart--heart",
};

export default class Heart extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const {className} = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 22"
        className={classnames(cssClass.CONTAINER, className)}
      >
        <path
          className={cssClass.HEART}
          fill={Colors.PRIMARY_BLUE_TINT_2}
          fillRule="evenodd"
          d="M20.67 13.08c3.97-3.97 4.22-8.08 1.7-10.6a6.47 6.47 0 0 0-9.2 0c-.48.46-.86 1-1.17 1.55A6.49 6.49 0 0 0 1.67 2.47C-.9 5-.63 9.11 3.33 13.08l8.3 8.34c.1.08.23.14.37.14.14 0 .25-.06.36-.14l8.3-8.34z"
        />
      </svg>
    );
  }
}
