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
var Colors_1 = require("../utils/Colors");
require("./TopBarButton.less");
var MarkerShape = {
    CIRCLE: "circle",
    TRIANGLE: "triangle",
};
var propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.any,
    href: PropTypes.string,
    markerShape: PropTypes.oneOf(Object.values(MarkerShape)),
    onClick: PropTypes.func,
    target: PropTypes.string,
};
var defaultProps = {
    markerShape: MarkerShape.CIRCLE,
};
var cssClass = {
    ACTIVE_INDICATOR: "TopBarButton--activeIndicator",
    ACTIVE_INDICATOR_SHAPE: "TopBarButton--activeIndicator--shape",
    MARKER: "TopBarButton--marker",
    MARKER_SHAPE: "TopBarButton--marker--shape",
    MARKER_CIRCLE: "TopBarButton--marker--circle",
    MARKER_TRIANGLE: "TopBarButton--marker--triangle",
    CONTAINER: "TopBarButton",
};
var Markers = (_a = {},
    _a[MarkerShape.CIRCLE] = (React.createElement("svg", { className: classnames(cssClass.MARKER, cssClass.MARKER_CIRCLE), viewBox: "0 0 100 100" },
        React.createElement("circle", { cx: 50, cy: 50, r: 50, fill: Colors_1.default.NEUTRAL_WHITE }),
        React.createElement("circle", { className: cssClass.MARKER_SHAPE, cx: 50, cy: 50, r: 35 }))),
    _a[MarkerShape.TRIANGLE] = (React.createElement("svg", { className: classnames(cssClass.MARKER, cssClass.MARKER_TRIANGLE), viewBox: "0 0 100 50" },
        React.createElement("polygon", { className: cssClass.MARKER_SHAPE, points: "50,0 100,50 0,50" }))),
    _a);
var TopBarButton = /** @class */ (function (_super) {
    __extends(TopBarButton, _super);
    function TopBarButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleContainerRef = function (ref) {
            _this._containerRef = ref;
        };
        return _this;
    }
    TopBarButton.prototype.focus = function () {
        if (this._containerRef && this._containerRef.focus) {
            this._containerRef.focus();
        }
    };
    TopBarButton.prototype.render = function () {
        var _a = this.props, active = _a.active, children = _a.children, className = _a.className, href = _a.href, markerShape = _a.markerShape, onClick = _a.onClick, target = _a.target;
        var additionalProps = _.omit(this.props, Object.keys(propTypes));
        var Wrapper = this._getWrapperComponent();
        return (React.createElement(Wrapper, __assign({}, additionalProps, { className: classnames(cssClass.CONTAINER, className), href: href, onClick: onClick, ref: this._handleContainerRef, target: target }),
            children,
            active && Markers[markerShape]));
    };
    TopBarButton.prototype._getWrapperComponent = function () {
        var _a = this.props, component = _a.component, href = _a.href;
        if (component) {
            return component;
        }
        if (href) {
            return "a";
        }
        return "button";
    };
    TopBarButton.propTypes = propTypes;
    TopBarButton.defaultProps = defaultProps;
    TopBarButton.cssClass = cssClass;
    TopBarButton.MarkerShape = MarkerShape;
    return TopBarButton;
}(React.PureComponent));
exports.default = TopBarButton;
var _a;
