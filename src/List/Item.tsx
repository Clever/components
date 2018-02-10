import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Item.less";

export default class Item extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static cssClass = {
    CONTAINER: "List--Item",

    type: type => `List--Item--${type}`,
  };

  render() {
    const {cssClass} = Item;
    const {children, className, onClick} = this.props;

    return (
      <li className={classnames(cssClass.CONTAINER, className)} onClick={onClick}>
        {children}
      </li>
    );
  }
}
