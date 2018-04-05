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
var flex_1 = require("../flex");
var Heart_1 = require("./Heart");
var MenuToggle_1 = require("./MenuToggle");
var TopBarButton_1 = require("./TopBarButton");
var TopBarMenu_1 = require("./TopBarMenu");
require("./TopBar.less");
var TopBarColor = {
    BLUE: "blue",
    PURPLE: "purple",
    TEAL: "teal",
};
var propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.values(TopBarColor)),
    logo: PropTypes.node,
    logoLinkHref: PropTypes.string,
    logoLinkTarget: PropTypes.string,
    onToggleMenu: PropTypes.func,
    showHeart: PropTypes.bool,
    showMenuToggle: PropTypes.bool,
    title: PropTypes.node,
    titleWrap: PropTypes.bool,
};
var defaultProps = {
    color: TopBarColor.BLUE,
};
var cssClass = {
    CONTAINER: "dewey--TopBar",
    HEART: "dewey--TopBar--heart",
    LOGO_LINK: "dewey--TopBar--logo--link",
    LOGO: "dewey--TopBar--logo",
    TITLE: "dewey--TopBar--title",
    TITLE_WRAP: "dewey--TopBar--title--wrap",
    color: function (c) { return "dewey--TopBar--color--" + c; },
};
// TODO: Just use the official React typings to avoid this mess.
var UntypedReact = null;
UntypedReact = React;
/**
 * Global page-level header component.
 */
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBar.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, color = _a.color, onToggleMenu = _a.onToggleMenu, showHeart = _a.showHeart, showMenuToggle = _a.showMenuToggle, title = _a.title, titleWrap = _a.titleWrap;
        return (React.createElement(flex_1.FlexBox, { alignItems: "center", className: classnames(cssClass.CONTAINER, cssClass.color(color), className) },
            showMenuToggle && React.createElement(MenuToggle_1.default, { onClick: onToggleMenu }),
            this._renderLogo(),
            showHeart && React.createElement(Heart_1.default, { className: cssClass.HEART }),
            title && (React.createElement("h1", { className: classnames(cssClass.TITLE, titleWrap && cssClass.TITLE_WRAP), title: title }, title)),
            children));
    };
    TopBar.prototype._renderLogo = function () {
        var _a = this.props, logoLinkHref = _a.logoLinkHref, logoLinkTarget = _a.logoLinkTarget, logo = _a.logo;
        if (!logo) {
            return null;
        }
        var styledLogo = UntypedReact.cloneElement(logo, {
            className: classnames(logo.props.className, cssClass.LOGO),
        });
        if (!logoLinkHref) {
            return styledLogo;
        }
        return (React.createElement(TopBarButton_1.default, { className: cssClass.LOGO_LINK, href: logoLinkHref, target: logoLinkTarget }, styledLogo));
    };
    TopBar.propTypes = propTypes;
    TopBar.defaultProps = defaultProps;
    TopBar.cssClass = cssClass;
    TopBar.Button = TopBarButton_1.default;
    TopBar.Color = TopBarColor;
    TopBar.Menu = TopBarMenu_1.default;
    return TopBar;
}(React.PureComponent));
exports.default = TopBar;
