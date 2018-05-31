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
var ReactDOM = require("react-dom");
require("./MenuItem.less");
var propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    component: PropTypes.any,
    customStyles: PropTypes.bool,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    href: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    target: PropTypes.string,
};
var defaultProps = {
    onClick: _.noop,
};
var cssClass = {
    CONTAINER: "Menu--MenuItem",
    DEFAULT_STYLES: "Menu--MenuItem--default",
    selected: function (baseClass) { return (baseClass ? baseClass + "--selected" : ""); },
};
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleClick = function () {
            _this.props.onClick();
            _this.props.onBlur();
        };
        return _this;
    }
    MenuItem.prototype.componentDidMount = function () {
        this._containerEl = ReactDOM.findDOMNode(this);
        this._updateFocus(this.props);
    };
    MenuItem.prototype.componentWillReceiveProps = function (nextProps) {
        this._updateFocus(nextProps);
    };
    MenuItem.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, component = _a.component, customStyles = _a.customStyles, href = _a.href, onBlur = _a.onBlur, onClick = _a.onClick, selected = _a.selected, target = _a.target;
        var additionalProps = _.omit(this.props, Object.keys(propTypes));
        var MenuButton = component;
        if (!MenuButton) {
            MenuButton = href ? "a" : "button";
        }
        return (React.createElement(MenuButton, __assign({}, additionalProps, { className: classnames(cssClass.CONTAINER, !customStyles && cssClass.DEFAULT_STYLES, className, selected && cssClass.selected(cssClass.CONTAINER), selected && cssClass.selected(className)), href: href, onBlur: onBlur, onClick: onClick, role: "menuitem", tabIndex: -1, target: target }), children));
    };
    MenuItem.prototype._updateFocus = function (props) {
        var _this = this;
        if (props.focused) {
            if (this._containerEl && this._containerEl.focus) {
                setTimeout(function () { return _this._containerEl.focus(); });
            }
        }
    };
    MenuItem.propTypes = propTypes;
    MenuItem.defaultProps = defaultProps;
    MenuItem.cssClass = cssClass;
    return MenuItem;
}(React.PureComponent));
exports.default = MenuItem;
