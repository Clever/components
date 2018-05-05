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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var classnames = require("classnames");
var PropTypes = require("prop-types");
var React = require("react");
var flex_1 = require("../flex");
var TopBarButton_1 = require("./TopBarButton");
var Menu_1 = require("../Menu");
require("../DropdownButton/Caret.less");
require("./TopBarMenu.less");
var propTypes = {
    children: Menu_1.default.propTypes.children,
    className: PropTypes.string,
    dropdownPlacement: Menu_1.default.propTypes.placement,
    label: PropTypes.node.isRequired,
};
var cssClass = {
    CARET: "DropdownButton--Caret",
    CONTAINER: "TopBarMenu",
    TRIGGER_CONTENT: "TopBarMenu--trigger--content",
    TRIGGER_LABEL: "TopBarMenu--trigger--label",
    TRIGGER: "TopBarMenu--trigger",
};
var TopBarMenu = /** @class */ (function (_super) {
    __extends(TopBarMenu, _super);
    function TopBarMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBarMenu.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, dropdownPlacement = _a.dropdownPlacement, label = _a.label;
        var additionalProps = _.omit(this.props, Object.keys(propTypes));
        return (React.createElement(Menu_1.default, __assign({}, additionalProps, { className: classnames(cssClass.CONTAINER, className), placement: dropdownPlacement, trigger: React.createElement(TopBarButton_1.default, { className: cssClass.TRIGGER },
                React.createElement(flex_1.FlexBox, { className: cssClass.TRIGGER_CONTENT },
                    React.createElement(flex_1.FlexItem, { className: cssClass.TRIGGER_LABEL, grow: true }, label),
                    React.createElement("div", { className: cssClass.CARET }))) }), children));
    };
    TopBarMenu.prototype._getWrapperComponent = function () {
        var _a = this.props, component = _a.component, href = _a.href;
        if (component) {
            return component;
        }
        if (href) {
            return "a";
        }
        return "button";
    };
    TopBarMenu.propTypes = propTypes;
    TopBarMenu.cssClass = cssClass;
    TopBarMenu.Item = Menu_1.default.Item;
    TopBarMenu.Placement = Menu_1.default.Placement;
    return TopBarMenu;
}(React.PureComponent));
exports.default = TopBarMenu;
