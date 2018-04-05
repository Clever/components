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
var classnames = require("classnames");
var React = require("react");
var PropTypes = require("prop-types");
require("./Item.less");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.render = function () {
        var cssClass = Item.cssClass;
        var _a = this.props, children = _a.children, className = _a.className, onClick = _a.onClick;
        var Wrapper = "div";
        if (onClick) {
            Wrapper = "button";
        }
        return (React.createElement("li", { className: classnames(cssClass.CONTAINER, className) },
            React.createElement(Wrapper, { className: classnames(cssClass.CONTENT_WRAPPER, !!onClick && cssClass.CONTENT_ONCLICK), onClick: onClick }, children)));
    };
    Item.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
    };
    Item.cssClass = {
        CONTAINER: "List--Item",
        CONTENT_WRAPPER: "List--Item--ContentWrapper",
        CONTENT_ONCLICK: "List--Item--ContentWrapperClickable",
        type: function (type) { return "List--Item--" + type; },
    };
    return Item;
}(React.PureComponent));
exports.default = Item;
