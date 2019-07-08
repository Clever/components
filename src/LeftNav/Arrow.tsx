/** eslint-disable max-len */

import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./Arrow.less";

export interface Props {
  className?: string;
}

const propTypes = {
  className: PropTypes.string,
};

export const cssClass = {
  CONTAINER: "LeftNav--NavLink--Arrow",
};

export default class Arrow extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const { className } = this.props;

    return (
      <svg className={classnames(cssClass.CONTAINER, className)} viewBox="0 0 1792 1792">
        <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
      </svg>
    );
  }
}
