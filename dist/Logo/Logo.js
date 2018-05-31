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
var BetaTag_1 = require("./BetaTag");
var Colors_1 = require("../utils/Colors");
require("./Logo.less");
var propTypes = {
    beta: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.values(Colors_1.default)),
    style: PropTypes.object,
};
var cssClass = {
    CONTAINER: "dewey--Logo",
    BETA_TAG: "dewey--Logo--betaTag",
    IMAGE: "dewey--Logo--image",
    TEXT: "dewey--Logo--text",
};
var Logo = /** @class */ (function (_super) {
    __extends(Logo, _super);
    function Logo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logo.prototype.render = function () {
        var _a = this.props, beta = _a.beta, className = _a.className, color = _a.color, style = _a.style;
        return (React.createElement("div", { className: classnames(cssClass.CONTAINER, className), style: style },
            React.createElement("svg", { className: classnames(cssClass.IMAGE), viewBox: "0 0 198 55", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { className: cssClass.TEXT, d: "M27.02 54.85C11.65 54.85.23 43 .23 28.04v-.15C.23 13.07 11.43.93 27.47.93c9.85 0 15.75 3.28 20.6 8.04l-7.31 8.42c-4.03-3.65-8.14-5.88-13.36-5.88-8.81 0-15.15 7.3-15.15 16.23v.15c0 8.93 6.2 16.38 15.15 16.38 5.97 0 9.62-2.38 13.73-6.1l7.31 7.37c-5.37 5.73-11.34 9.3-21.42 9.3M49.49.37h11.34v54.36H49.49zM81.88 22.38c-4.7 0-7.77 3.35-8.66 8.49H90.3c-.67-5.07-3.66-8.5-8.43-8.5m19.33 15.57H73.37c1.12 5.14 4.7 7.82 9.77 7.82 3.81 0 6.57-1.2 9.7-4.1l6.5 5.74c-3.73 4.62-9.1 7.45-16.34 7.45-12.02 0-20.9-8.42-20.9-20.63v-.15c0-11.4 8.13-20.78 19.78-20.78 13.36 0 19.47 10.35 19.47 21.67v.15c0 1.12-.07 1.79-.14 2.83M122.93 54.64h-10.3L96.88 14.43h12.02l8.95 26.73 9.04-26.73h11.79l-15.75 40.21M153.38 22.38c-4.7 0-7.77 3.35-8.66 8.49h17.09c-.67-5.07-3.66-8.5-8.43-8.5m19.33 15.57h-27.84c1.12 5.14 4.7 7.82 9.78 7.82 3.8 0 6.56-1.2 9.7-4.1l6.49 5.74c-3.73 4.62-9.1 7.45-16.34 7.45-12.02 0-20.9-8.42-20.9-20.63v-.15c0-11.4 8.13-20.78 19.78-20.78 13.36 0 19.48 10.35 19.48 21.67v.15c0 1.12-.08 1.79-.15 2.83M197.33 25.91c-7.53 0-12.16 4.55-12.16 14.08v14.74h-11.34V14.82h11.34v8.04c2.31-5.51 6.04-9.08 12.76-8.79v11.84h-.6", fill: color, fillRule: "evenodd" })),
            beta && React.createElement(BetaTag_1.default, { className: classnames(cssClass.BETA_TAG) })));
    };
    Logo.propTypes = propTypes;
    Logo.defaultProps = {
        color: Colors_1.default.NEUTRAL_WHITE,
    };
    Logo.cssClass = cssClass;
    return Logo;
}(React.PureComponent));
exports.default = Logo;
