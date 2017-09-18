import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Item from "./Item";
import MorePropTypes from "../utils/MorePropTypes";

import "./List.less";

const RowType = {
  PLAIN: "plain",
  BORDERED: "bordered",
  ZEBRA: "zebra",
};

const cssClass = {
  CONTAINER: "List",
  EMPTY: "List--empty",
  HEADER: "List--header",
  ITEMS: "List--items",
  NO_BORDER: "List--noBorder",

  rowType: type => `List--items--${type}`,
};

export default class List extends React.PureComponent {
  static propTypes = {
    children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Item)),
    className: PropTypes.string,
    emptyMessage: PropTypes.node,
    noBorder: PropTypes.bool,
    rowType: PropTypes.oneOf(_.values(RowType)),
    title: PropTypes.node,
  };

  static defaultProps = {
    rowType: RowType.PLAIN,
    emptyMessage: <span className={cssClass.EMPTY}>NO DATA</span>,
  };

  static cssClass = cssClass;

  static Item = Item;

  static RowType = RowType;

  render() {
    const {children, className, emptyMessage, noBorder, rowType, title} = this.props;

    const items = _.compact(React.Children.toArray(children)).length === 0
      ? <Item>{emptyMessage}</Item>
      : children;

    return (
      <div className={classnames(cssClass.CONTAINER, noBorder && cssClass.NO_BORDER, className)}>
        {title && (
          <header className={classnames(cssClass.HEADER, cssClass.rowType(rowType))}>
            {title}
          </header>
        )}
        <ul className={classnames(cssClass.ITEMS, cssClass.rowType(rowType))}>
          {items}
        </ul>
      </div>
    );
  }
}
