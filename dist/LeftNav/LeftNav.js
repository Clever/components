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

// no group open, nothing selected      -> drawer closed, no visual selected
// no group open, top link selected     -> drawer closed, link visually selected
// no group open, sub link selected     -> drawer open to group, group visually open, link visually selected
// group open, sub link selected        -> drawer open to group, group visually open, link visually selected
// group open, top link selected        -> drawer open to group, group visually open, link visually selected
// group open, nothing selected         -> drawer open to group, group visually selected
// group open, hidden sub link selected -> drawer open to group, group visually selected

var LeftNav = exports.LeftNav = function (_React$Component) {
  _inherits(LeftNav, _React$Component);

  function LeftNav(props) {
    _classCallCheck(this, LeftNav);

    var _this = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, props));

    var selectedNavGroup = props.children.find(function (child) {
      return child.type === _NavGroup.NavGroup && _react2.default.Children.toArray(child.props.children).some(function (navLink) {
        return navLink.props.selected;
      });
    });
    _this.state = { openNavGroup: selectedNavGroup };
    return _this;
  }

  _createClass(LeftNav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var cssClass = LeftNav.cssClass;


      var children = _react2.default.Children.map(this.props.children, function (child) {
        // Configure the props for NavGroups to track which one is open
        if (child.type === _NavGroup.NavGroup) {
          var _ret = function () {
            var that = _this2;
            // TODO figure out why object equality doesn't work here. we don't want
            // to rely on label being unique
            var open = _this2.state.openNavGroup && child.props.label === _this2.state.openNavGroup.props.label;
            return {
              v: _react2.default.cloneElement(child, {
                open: open,
                onClick: function onClick() {
                  console.log("click", child.props.label);
                  that.setState({ openNavGroup: open ? null : child });
                }
              })
            };
          }();

          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
        // Configure the props for top level NavLinks to close other open drawers on click
        return _react2.default.cloneElement(child, { onClick: function onClick() {
            console.log("click", child.props.label);
            _this2.setState({ openNavGroup: null });
            child.props.onClick();
          } });
      });

      // Find the open NavGroup so that we can render its subnav drawer
      var openChild = _react2.default.Children.toArray(children).find(function (child) {
        return child.props.open;
      });

      var collapsed = this.props.collapsed ? cssClass.COLLAPSED : null;

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