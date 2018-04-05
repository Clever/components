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
var MenuItem_1 = require("./MenuItem");
var MorePropTypes_1 = require("../utils/MorePropTypes");
require("./Menu.less");
var Placement = {
    LEFT: "left",
    RIGHT: "right",
};
var propTypes = {
    children: MorePropTypes_1.default.oneOrManyOf(MorePropTypes_1.default.instanceOfComponent(MenuItem_1.default)),
    className: PropTypes.string,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string,
    minWidth: PropTypes.string,
    onOpenChange: PropTypes.func,
    onSelect: PropTypes.func,
    placement: PropTypes.oneOf(Object.values(Placement)),
    stayOpenOnSelect: PropTypes.bool,
    trigger: PropTypes.node.isRequired,
    wrapItems: PropTypes.bool,
};
var defaultProps = {
    maxHeight: "50vh",
    maxWidth: "50vw",
    minWidth: "100%",
    onOpenChange: _.noop,
    onSelect: _.noop,
    placement: Placement.LEFT,
};
var cssClass = {
    CONTAINER: "Menu",
    DROPDOWN_CONTAINER: "Menu--dropdown--container",
    DROPDOWN: "Menu--dropdown",
    ITEM_WRAPPER: "Menu--itemWrapper",
    TRIGGER: "Menu--trigger",
    WRAP: "Menu--dropdown--wrap",
    placement: function (p) { return "Menu--dropdown--placement--" + p; },
};
var KeyCode = {
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    END: 35,
    ESCAPE: 27,
    HOME: 36,
};
var ArrowScrollDirection = (_a = {},
    _a[KeyCode.ARROW_DOWN] = 1,
    _a[KeyCode.ARROW_UP] = -1,
    _a);
// TODO: Just use the official React typings to avoid this mess.
var UntypedReact = null;
UntypedReact = React;
var nextID = 0;
/**
 * Attaches a dropdown menu to the given child node.
 *
 * Follows recommendations from w3.org:
 * https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/menu-button/menu-button-links.html
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._menuID = nextID++;
        _this.IDs = {
            DROPDOWN: "Menu--dropdown--" + _this._menuID,
            TRIGGER: "Menu--trigger--" + _this._menuID,
        };
        _this.state = {
            focusIndex: 0,
            open: false,
        };
        _this._handleTriggerRef = function (ref) {
            _this._triggerRef = ref;
        };
        _this._handleTriggerClick = function (e) {
            var trigger = _this.props.trigger;
            _this._toggleDropdown();
            if (trigger.props.onClick) {
                trigger.props.onClick(e);
            }
        };
        _this._handleItemClick = function (menuItem, e) {
            var stayOpenOnSelect = _this.props.stayOpenOnSelect;
            if (!stayOpenOnSelect) {
                _this._setDropdownOpen(false, function () { return setTimeout(_this._refocusTrigger); });
            }
            menuItem.props.onClick(e);
        };
        _this._handleFocusOut = function (e) {
            var nextElement = e.relatedTarget;
            if (nextElement &&
                nextElement.classList.contains(MenuItem_1.default.cssClass.CONTAINER) &&
                nextElement.parentNode.parentNode.id === _this.IDs.DROPDOWN) {
                return;
            }
            if (nextElement && nextElement.id === _this.IDs.TRIGGER) {
                return;
            }
            _this._setDropdownOpen(false);
        };
        _this._handleKeyDown = function (e) {
            switch (e.keyCode) {
                case KeyCode.ARROW_DOWN:
                    _this._handleArrowKeyDown(e);
                    return;
                case KeyCode.ARROW_UP:
                    _this._handleArrowKeyDown(e);
                    return;
                default:
                    return;
            }
        };
        _this._handleArrowKeyDown = function (e) {
            var _a = _this.state, focusIndex = _a.focusIndex, open = _a.open;
            var menuItems = _this._getMenuItems();
            if (menuItems.length === 0) {
                return;
            }
            var defaultFocusIndex = menuItems.findIndex(function (i) { return !!i.props.selected; });
            var shouldResetFocus = !open || focusIndex === null;
            var lastFocusIndex = shouldResetFocus ? defaultFocusIndex : focusIndex;
            var nextFocusIndex = lastFocusIndex + ArrowScrollDirection[e.keyCode];
            if (nextFocusIndex >= menuItems.length) {
                nextFocusIndex = 0;
            }
            if (nextFocusIndex < 0) {
                nextFocusIndex = menuItems.length - 1;
            }
            _this.setState({ focusIndex: nextFocusIndex, open: true });
            _this.props.onOpenChange(true);
            e.preventDefault();
            e.stopPropagation();
        };
        _this._handleKeyUp = function (e) {
            var open = _this.state.open;
            var menuItems = _this._getMenuItems();
            if (menuItems.length === 0) {
                return;
            }
            switch (e.keyCode) {
                case KeyCode.ESCAPE:
                    _this._setDropdownOpen(false, function () { return setTimeout(_this._refocusTrigger); });
                    return;
                case KeyCode.HOME:
                    if (!open) {
                        return;
                    }
                    _this.setState({ focusIndex: 0 });
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                case KeyCode.END:
                    if (!open) {
                        return;
                    }
                    _this.setState({ focusIndex: menuItems.length - 1 });
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                default:
                    return;
            }
        };
        _this._refocusTrigger = function () { return _this._triggerRef && _this._triggerRef.focus && _this._triggerRef.focus(); };
        _this._toggleDropdown = function () { return _this._setDropdownOpen(!_this.state.open); };
        _this._setDropdownOpen = function (open, cb) {
            if (cb === void 0) { cb = _.noop; }
            var menuItems = _this._getMenuItems();
            var focusIndex = menuItems.findIndex(function (i) { return !!i.props.selected; });
            if (focusIndex === -1) {
                focusIndex = 0;
            }
            _this.setState({ focusIndex: focusIndex, open: open }, cb);
            _this.props.onOpenChange(open);
        };
        return _this;
    }
    Menu.prototype.componentDidMount = function () {
        this._containerEl = ReactDOM.findDOMNode(this);
        if (this._containerEl) {
            this._containerEl.addEventListener("focusout", this._handleFocusOut);
        }
    };
    Menu.prototype.componentWillUnmount = function () {
        if (this._containerEl) {
            this._containerEl.removeEventListener("focusout", this._handleFocusOut);
        }
    };
    Menu.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, minWidth = _a.minWidth, placement = _a.placement, trigger = _a.trigger, wrapItems = _a.wrapItems;
        var open = this.state.open;
        var additionalProps = _.omit(this.props, Object.keys(propTypes));
        return (React.createElement("div", __assign({}, additionalProps, { className: classnames(cssClass.CONTAINER, className), onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp }),
            UntypedReact.cloneElement(trigger, {
                "aria-controls": this.IDs.DROPDOWN,
                "aria-expanded": open,
                "aria-haspopup": true,
                className: classnames(cssClass.TRIGGER, trigger.props.className),
                id: this.IDs.TRIGGER,
                onClick: this._handleTriggerClick,
                ref: this._handleTriggerRef,
                role: "button",
            }),
            open && (React.createElement("ul", { "aria-labelled-by": this.IDs.TRIGGER, className: classnames(cssClass.DROPDOWN, cssClass.placement(placement), wrapItems && cssClass.WRAP), id: this.IDs.DROPDOWN, role: "menu", style: { maxHeight: maxHeight, maxWidth: maxWidth, minWidth: minWidth } }, this._getMenuItems().map(function (menuItem, i) { return (React.createElement("li", { className: cssClass.ITEM_WRAPPER, key: i, role: "none" }, UntypedReact.cloneElement(menuItem, {
                focused: _this._isFocused(menuItem, i),
                onClick: function (e) { return _this._handleItemClick(menuItem, e); },
            }))); })))));
    };
    Menu.prototype._getKeyCode = function (e) {
        if (!_.isNil(e.key)) {
            return e.key;
        }
        if (!_.isNil(e.keyIdentifier)) {
            return e.keyIdentifier;
        }
        return e.keyCode;
    };
    Menu.prototype._getMenuItems = function () {
        return React.Children.toArray(this.props.children).filter(function (i) { return !!i; });
    };
    Menu.prototype._isFocused = function (menuItem, itemIndex) {
        var focusIndex = this.state.focusIndex;
        if (focusIndex === null) {
            return !!menuItem.props.selected;
        }
        return itemIndex === focusIndex;
    };
    Menu.propTypes = propTypes;
    Menu.defaultProps = defaultProps;
    Menu.cssClass = cssClass;
    Menu.Item = MenuItem_1.default;
    Menu.Placement = Placement;
    return Menu;
}(React.PureComponent));
exports.default = Menu;
var _a;
