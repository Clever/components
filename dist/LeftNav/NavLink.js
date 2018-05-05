"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLink = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooltip = require("../Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Arrow = require("./Arrow");

var _Arrow2 = _interopRequireDefault(_Arrow);

require("./NavLink.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavLink = exports.NavLink = function (_React$PureComponent) {
  _inherits(NavLink, _React$PureComponent);

  function NavLink() {
    _classCallCheck(this, NavLink);

    return _possibleConstructorReturn(this, (NavLink.__proto__ || Object.getPrototypeOf(NavLink)).apply(this, arguments));
  }

  _createClass(NavLink, [{
    key: "render",
    value: function render() {
      var cssClass = NavLink.cssClass;
      var _props = this.props;
      var _collapsed = _props._collapsed;
      var _withArrow = _props._withArrow;
      var _withTooltips = _props._withTooltips;
      var className = _props.className;
      var component = _props.component;
      var href = _props.href;
      var icon = _props.icon;
      var label = _props.label;
      var onClick = _props.onClick;
      var selected = _props.selected;

      var additionalProps = _objectWithoutProperties(_props, ["_collapsed", "_withArrow", "_withTooltips", "className", "component", "href", "icon", "label", "onClick", "selected"]);

      var Component = "button";
      if (component) {
        Component = component;
      } else if (href) {
        Component = "a";
      }

      var element = React.createElement(
        Component,
        _extends({}, additionalProps, {
          className: (0, _classnames2.default)(cssClass.CONTAINER, selected && cssClass.SELECTED, _collapsed && cssClass.COLLAPSED, _withArrow && cssClass.WITH_ARROW, className),
          href: href,
          onClick: onClick
        }),
        React.createElement(
          "div",
          { className: cssClass.CONTENTS },
          icon && React.createElement(
            "div",
            { className: cssClass.ICON_CONTAINER },
            React.cloneElement(icon, {
              className: (0, _classnames2.default)(cssClass.ICON, icon.props.className)
            })
          ),
          React.createElement(
            "div",
            { className: cssClass.LABEL_CONTAINER },
            React.createElement(
              "div",
              { className: cssClass.LABEL, title: label },
              label
            )
          ),
          _withArrow && React.createElement(
            "div",
            { className: cssClass.ARROW_CONTAINER },
            React.createElement(_Arrow2.default, { className: cssClass.ARROW_ICON })
          )
        )
      );

      if (!_withTooltips) {
        return element;
      }

      return React.createElement(
        _Tooltip2.default,
        { content: label, hide: !_collapsed, placement: _Tooltip2.default.Placement.RIGHT },
        element
      );
    }
  }]);

  return NavLink;
}(React.PureComponent);

NavLink.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.node,
  onClick: PropTypes.func,
  selected: PropTypes.bool,

  // Internal use only:
  _collapsed: PropTypes.bool,
  _withArrow: PropTypes.bool,
  _withTooltips: PropTypes.bool
};

NavLink.cssClass = {
  ARROW_CONTAINER: "NavLink--arrow--container",
  ARROW_ICON: "NavLink--arrow",
  COLLAPSED: "NavLink--collapsed",
  CONTAINER: "NavLink",
  CONTENTS: "NavLink--contents",
  ICON: "NavLink--icon",
  ICON_CONTAINER: "NavLink--icon--container",
  LABEL: "NavLink--label",
  LABEL_CONTAINER: "NavLink--label--container",
  SELECTED: "NavLink--selected",
  WITH_ARROW: "NavLink--withArrow"
};