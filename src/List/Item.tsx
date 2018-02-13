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
    CLICKABLE_CONTAINER: "List--Item--Clickable",
    CLICKABLE_ITEM: "List--Item--ClickableItem",

    type: type => `List--Item--${type}`,
  };

  render() {
    const {cssClass} = Item;
    const {children, className, onClick} = this.props;

    if (onClick) {
      return (
        <li className={classnames(cssClass.CONTAINER, cssClass.CLICKABLE_CONTAINER, className)}>
          <button className={cssClass.CLICKABLE_ITEM} onClick={onClick}>
            {children}
          </button>
        </li>
      );
    }

    return (
      <li className={classnames(cssClass.CONTAINER, className)}>
        {children}
      </li>
    );
  }
}
