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
var Colors_1 = require("../utils/Colors");
var propTypes = {
    className: PropTypes.string,
};
var cssClass = {
    CONTAINER: "dewey--Heart",
    HEART: "dewey--Heart--heart",
};
var Heart = /** @class */ (function (_super) {
    __extends(Heart, _super);
    function Heart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Heart.prototype.render = function () {
        var className = this.props.className;
        return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 22", className: classnames(cssClass.CONTAINER, className) },
            React.createElement("path", { className: cssClass.HEART, fill: Colors_1.default.PRIMARY_BLUE_TINT_2, fillRule: "evenodd", d: "M20.67 13.08c3.97-3.97 4.22-8.08 1.7-10.6a6.47 6.47 0 0 0-9.2 0c-.48.46-.86 1-1.17 1.55A6.49 6.49 0 0 0 1.67 2.47C-.9 5-.63 9.11 3.33 13.08l8.3 8.34c.1.08.23.14.37.14.14 0 .25-.06.36-.14l8.3-8.34z" })));
    };
    Heart.propTypes = propTypes;
    return Heart;
}(React.PureComponent));
exports.default = Heart;
