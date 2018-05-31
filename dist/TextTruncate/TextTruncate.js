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
var Button_1 = require("../Button/Button");
var propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    showMoreLabel: PropTypes.string,
    showLessLabel: PropTypes.string,
    lines: PropTypes.number,
    maxCharsShown: PropTypes.number,
};
var defaultProps = {
    maxCharsShown: 300,
    showMoreLabel: "Show more",
    showLessLabel: "Show less",
};
var cssClass = {
    CONTAINER: "TextTruncate",
};
/**
 * Truncate long text
 * Comes with read more/less toggle
 */
var TextTruncate = /** @class */ (function (_super) {
    __extends(TextTruncate, _super);
    function TextTruncate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            truncated: true,
        };
        _this.toggleTruncation = function (event) {
            event.preventDefault();
            _this.setState({ truncated: !_this.state.truncated });
        };
        return _this;
    }
    TextTruncate.prototype.truncate = function (text) {
        return text.substring(0, this.props.maxCharsShown);
    };
    TextTruncate.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, text = _a.text, showMoreLabel = _a.showMoreLabel, showLessLabel = _a.showLessLabel, maxCharsShown = _a.maxCharsShown;
        var truncated = this.state.truncated;
        if (text.length < maxCharsShown) {
            return (React.createElement("div", { className: classnames(cssClass.CONTAINER, className) }, text));
        }
        return (React.createElement("div", null, truncated ?
            React.createElement("div", { className: classnames(cssClass.CONTAINER, className) },
                this.truncate(text),
                " ... ",
                React.createElement(Button_1.Button, { type: "linkPlain", onClick: this.toggleTruncation, value: showMoreLabel })) :
            React.createElement("div", { className: classnames(cssClass.CONTAINER, className) },
                text,
                " ",
                React.createElement(Button_1.Button, { type: "linkPlain", onClick: function (e) { return _this.toggleTruncation(e); }, value: showLessLabel }))));
    };
    TextTruncate.propTypes = propTypes;
    TextTruncate.defaultProps = defaultProps;
    TextTruncate.cssClass = cssClass;
    return TextTruncate;
}(React.PureComponent));
exports.default = TextTruncate;
