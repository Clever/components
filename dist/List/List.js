"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var classnames = require("classnames");
var PropTypes = require("prop-types");
var React = require("react");
var Item_1 = require("./Item");
var MorePropTypes_1 = require("../utils/MorePropTypes");
require("./List.less");
var RowType = {
    PLAIN: "plain",
    BORDERED: "bordered",
    ZEBRA: "zebra",
};
var cssClass = {
    CONTAINER: "List",
    EMPTY: "List--empty",
    HEADER: "List--header",
    ITEMS: "List--items",
    NO_BORDER: "List--noBorder",
    rowType: function (type) { return "List--items--" + type; },
};
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, itemsClassName = _a.itemsClassName, emptyMessage = _a.emptyMessage, noBorder = _a.noBorder, rowType = _a.rowType, title = _a.title;
        var items = _.compact(React.Children.toArray(children)).length === 0
            ? React.createElement(Item_1.default, null, emptyMessage)
            : children;
        return (React.createElement("div", { className: classnames(cssClass.CONTAINER, noBorder && cssClass.NO_BORDER, className) },
            title && (React.createElement("header", { className: classnames(cssClass.HEADER, cssClass.rowType(rowType)) }, title)),
            React.createElement("ul", { className: classnames(cssClass.ITEMS, cssClass.rowType(rowType), itemsClassName) }, items)));
    };
    List.propTypes = {
        children: MorePropTypes_1.default.oneOrManyOf(MorePropTypes_1.default.instanceOfComponent(Item_1.default)),
        className: PropTypes.string,
        itemsClassName: PropTypes.string,
        emptyMessage: PropTypes.node,
        noBorder: PropTypes.bool,
        rowType: PropTypes.oneOf(_.values(RowType)),
        title: PropTypes.node,
    };
    List.defaultProps = {
        rowType: RowType.PLAIN,
        emptyMessage: React.createElement("span", { className: cssClass.EMPTY }, "NO DATA"),
    };
    List.cssClass = cssClass;
    List.Item = Item_1.default;
    List.RowType = RowType;
    return List;
}(React.PureComponent));
exports.default = List;
