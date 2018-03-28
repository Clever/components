"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeftNav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _RootCloseWrapper = require("react-overlays/lib/RootCloseWrapper");

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _NavLink = require("./NavLink");

var _NavGroup = require("./NavGroup");

require("./LeftNav.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** NOTE: Corresponds to the `@timingSlowly` LESS constant in src/less/animations.less. */
var WIDTH_TRANSITION_DURATION_MS = 400;

var LeftNav = exports.LeftNav = function (_React$PureComponent) {
  _inherits(LeftNav, _React$PureComponent);

  function LeftNav(props) {
    _classCallCheck(this, LeftNav);

    // If a NavLink in a NavGroup is marked as selected on initialization, we
    // should open the drawer to show it. Otherwise, don't start with the drawer open.
    var _this = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, props));

    var selectedNavGroup = _lodash2.default.find(_this._getNonEmptyChildren(props.children), function (child) {
      return child.type === _NavGroup.NavGroup && _this._getNonEmptyChildren(child.props.children).some(function (navLink) {
        return navLink.props.selected;
      });
    });
    _this.state = { openNavGroup: selectedNavGroup ? selectedNavGroup.props.id : null };
    return _this;
  }

  _createClass(LeftNav, [{
    key: "_getNonEmptyChildren",
    value: function _getNonEmptyChildren(children) {
      return _lodash2.default.compact(React.Children.toArray(children));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cssClass = LeftNav.cssClass;
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var collapseOnSubNavOpen = _props.collapseOnSubNavOpen;
      var collapsed = _props.collapsed;
      var withActiveNavGroups = _props.withActiveNavGroups;
      var withTooltips = _props.withTooltips;
      var openNavGroup = this.state.openNavGroup;

      var _collapsed = collapsed || collapseOnSubNavOpen && !!openNavGroup;

      // Clone all of the children so that we can attach our own click handlers
      var navItems = this._getNonEmptyChildren(children).map(function (child) {
        // Configure top level NavLinks to close any open NavGroup on click
        if (child.type === _NavLink.NavLink) {
          return React.cloneElement(child, {
            _collapsed: _collapsed,
            _withTooltips: withTooltips,
            onClick: function onClick() {
              _this2.setState({ openNavGroup: null });
              if (child.props.onClick) {
                child.props.onClick();
              }
            }
          });
        }

        // Configure NavGroups to open/close themselves on click
        if (child.type === _NavGroup.NavGroup) {
          var open = child.props.id === openNavGroup;
          return React.cloneElement(child, {
            _collapsed: _collapsed,
            _open: open,
            _withActiveNavGroups: withActiveNavGroups,
            _withTooltips: withTooltips,
            _onClick: function _onClick() {
              return _this2.setState({ openNavGroup: open ? null : child.props.id });
            }
          });
        }

        return null; // Should never get here thanks to PropType validation
      });

      // Find the open NavGroup so that we can render its children NavLinks in the drawer
      var openChild = _lodash2.default.find(this._getNonEmptyChildren(navItems), function (item) {
        return item.props._open;
      });

      return React.createElement(
        _RootCloseWrapper2.default,
        { onRootClose: function onRootClose() {
            return _this2._onRootClose();
          } },
        React.createElement(
          "nav",
          {
            className: (0, _classnames2.default)(cssClass.CONTAINER, _collapsed && cssClass.COLLAPSED, openChild && cssClass.WITH_SUBNAV_OPEN, className)
          },
          React.createElement(
            "div",
            { className: (0, _classnames2.default)(cssClass.TOPNAV, _collapsed && cssClass.TOPNAV_COLLAPSED) },
            navItems
          ),
          React.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              className: (0, _classnames2.default)(cssClass.SUBNAV, openChild && cssClass.SUBNAV_OPEN),
              transitionEnterTimeout: WIDTH_TRANSITION_DURATION_MS,
              transitionLeaveTimeout: WIDTH_TRANSITION_DURATION_MS,
              component: "div",
              transitionName: cssClass.SUBNAV_CONTENT_ANIM
            },
            openChild && React.createElement(
              "div",
              { className: cssClass.SUBNAV_CONTENT },
              openChild.props.children
            )
          )
        )
      );
    }
  }, {
    key: "_onRootClose",
    value: function _onRootClose() {
      var closeSubNavOnBlur = this.props.closeSubNavOnBlur;


      if (!closeSubNavOnBlur) {
        return;
      }

      this.setState({ openNavGroup: null });
    }
  }]);

  return LeftNav;
}(React.PureComponent);

LeftNav.NavLink = _NavLink.NavLink;
LeftNav.NavGroup = _NavGroup.NavGroup;

LeftNav.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(PropTypes.oneOfType([_MorePropTypes2.default.instanceOfComponent(_NavLink.NavLink), _MorePropTypes2.default.instanceOfComponent(_NavGroup.NavGroup)])),
  className: PropTypes.string,
  closeSubNavOnBlur: PropTypes.bool,
  collapseOnSubNavOpen: PropTypes.bool,
  collapsed: PropTypes.bool,
  withActiveNavGroups: PropTypes.bool,
  withTooltips: PropTypes.bool
};

LeftNav.cssClass = {
  COLLAPSED: "LeftNav--collapsed",
  CONTAINER: "LeftNav",
  SUBNAV_CONTENT_ANIM: "LeftNav--subnav--content--anim",
  SUBNAV_CONTENT: "LeftNav--subnav--content",
  SUBNAV_OPEN: "LeftNav--subnav--open",
  SUBNAV: "LeftNav--subnav",
  TOPNAV_COLLAPSED: "LeftNav--topnav--collapsed",
  TOPNAV: "LeftNav--topnav",
  WITH_SUBNAV_OPEN: "LeftNav--withSubnavOpen"
};