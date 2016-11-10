"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeftNav = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require("../");

var _NavLink = require("./NavLink");

var _NavGroup = require("./NavGroup");

require("./LeftNav.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftNav = exports.LeftNav = function (_React$Component) {
  _inherits(LeftNav, _React$Component);

  function LeftNav(props) {
    _classCallCheck(this, LeftNav);

    var _this = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, props));

    _this.state = { openNavGroup: null };
    return _this;
  }

  _createClass(LeftNav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var cssClass = LeftNav.cssClass;

      // Configure the props for NavGroup children to track which one is open

      var children = _react2.default.Children.map(this.props.children, function (child) {
        if (child.type === _NavGroup.NavGroup) {
          var _ret = function () {
            var that = _this2;
            var open = child === _this2.state.openNavGroup;
            return {
              v: _react2.default.cloneElement(child, {
                open: open,
                onClick: function onClick() {
                  console.log("click", child.label);
                  that.setState({ openNavGroup: open ? null : child });
                  //child.props.onClick(); // TODO maybe let NavGroup have onClick prop passed in?
                }
              })
            };
          }();

          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
        return child;
      });
      console.log(children);

      // Find the open NavGroup so that we can render its subnav drawer
      var openChild = _react2.default.Children.toArray(children).find(function (child) {
        return child.props.open;
      });
      console.log(openChild);

      var collapsed = this.props.collapsed ? cssClass.COLLAPSED : null;
      console.log(collapsed);

      return _react2.default.createElement(
        _.FlexBox,
        { component: "nav", className: cssClass.CONTAINER },
        _react2.default.createElement(
          _.FlexItem,
          { component: "ul", className: (0, _classnames2.default)(cssClass.TOPNAV, collapsed) },
          children
        ),
        openChild && _react2.default.createElement(
          _.FlexItem,
          { component: "ul", className: cssClass.SUBNAV },
          openChild.props.children
        )
      );
    }
  }]);

  return LeftNav;
}(_react2.default.Component);

LeftNav.NavLink = _NavLink.NavLink;
LeftNav.NavGroup = _NavGroup.NavGroup;

LeftNav.propTypes = {
  // List required and optional proptypes
};

LeftNav.cssClass = {
  CONTAINER: "LeftNav",
  COLLAPSED: "LeftNav--collapsed",
  TOPNAV: "LeftNav--topnav",
  SUBNAV: "LeftNav--subnav"
};