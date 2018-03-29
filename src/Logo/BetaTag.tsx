import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Colors from "../utils/Colors";

import "./BetaTag.less";

const propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(Colors)),
  style: PropTypes.object,
};

const cssClass = {
  CONTAINER: "BetaTag",
  PATH: "BetaTag--path",
};

export default class BetaTag extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = {
    color: Colors.PRIMARY_BLUE,
  };

  static cssClass = cssClass;

  render() {
    const {className, color, style} = this.props;

    return (
      <svg
        className={classnames(cssClass.CONTAINER, className)}
        style={style}
        viewBox="0 0 32 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={classnames(cssClass.PATH)}
          d="M23.6299992,7.603 L25.7089992,7.603 L24.6689992,4.735 L23.6299992,7.603 Z M26.521,9.982 L26.101,8.853 L23.243,8.853 L22.823,9.982 L21.213,9.982 L23.782,3.315 L25.561,3.315 L28.129,9.982 L26.521,9.982 Z M19.511,9.982 L18.083,9.982 L18.083,4.565 L16.133,4.565 L16.133,3.315 L21.451,3.315 L21.451,4.565 L19.511,4.565 L19.511,9.982 Z M14.831,4.565 L11.533,4.565 L11.533,5.964 L14.76,5.964 L14.76,7.213 L11.533,7.213 L11.533,8.732 L14.831,8.732 L14.831,9.982 L10.113,9.982 L10.113,3.315 L14.831,3.315 L14.831,4.565 Z M7.4590001,5.2647 C7.4590001,5.6947 7.1590001,5.9647 6.6790001,5.9647 L4.9000001,5.9647 L4.9000001,4.5647 L6.6790001,4.5647 C7.1590001,4.5647 7.4590001,4.8547 7.4590001,5.2647 Z M6.7390001,7.2134 C7.2890001,7.2134 7.5890001,7.5534 7.5890001,7.9734 C7.5890001,8.4524 7.2680001,8.7324 6.7390001,8.7324 L4.9000001,8.7324 L4.9000001,7.2134 L6.7390001,7.2134 Z M7.101,9.982 L3.483,9.982 L3.483,3.315 L6.992,3.315 C8.26,3.315 8.911,4.125 8.911,5.015 C8.911,5.844 8.391,6.414 7.761,6.544 C8.481,6.654 9.041,7.343 9.041,8.173 C9.041,9.183 8.38,9.982 7.101,9.982 L7.101,9.982 Z M29.269,-8.8817842e-16 L2.343,-8.8817842e-16 C1.049,-8.8817842e-16 0,1.049 0,2.343 L0,11.031 C0,12.325 1.049,13.374 2.343,13.374 L29.269,13.374 C30.563,13.374 31.612,12.325 31.612,11.031 L31.612,2.343 C31.612,1.049 30.563,-8.8817842e-16 29.269,-8.8817842e-16 L29.269,-8.8817842e-16 Z"
          fill={color}
          fillRule="nonzero"
        />
      </svg>
    );
  }
}
