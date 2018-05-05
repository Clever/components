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
var PropTypes = require("prop-types");
var React = require("react");
var Tooltip_1 = require("../Tooltip");
var TopBarButton_1 = require("./TopBarButton");
require("./MenuToggle.less");
var propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
};
var cssClass = {
    CONTAINER: "MenuToggle",
    BAR: "MenuToggle--bar",
};
var MenuToggle = /** @class */ (function (_super) {
    __extends(MenuToggle, _super);
    function MenuToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuToggle.prototype.render = function () {
        var _a = this.props, className = _a.className, onClick = _a.onClick;
        return (React.createElement(Tooltip_1.default, { content: "Menu", placement: "right" },
            React.createElement(TopBarButton_1.default, { className: classnames(cssClass.CONTAINER, className), onClick: onClick },
                React.createElement("div", { className: cssClass.BAR }),
                React.createElement("div", { className: cssClass.BAR }),
                React.createElement("div", { className: cssClass.BAR }))));
    };
    MenuToggle.propTypes = propTypes;
    return MenuToggle;
}(React.PureComponent));
exports.default = MenuToggle;
