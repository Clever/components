"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _NavLink = require("./NavLink");

require("./NavGroup.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
var NavGroup = exports.NavGroup = function (_React$PureComponent) {
  _inherits(NavGroup, _React$PureComponent);

  function NavGroup() {
    _classCallCheck(this, NavGroup);

    return _possibleConstructorReturn(this, (NavGroup.__proto__ || Object.getPrototypeOf(NavGroup)).apply(this, arguments));
  }

  _createClass(NavGroup, [{
    key: "render",
    value: function render() {
      var cssClass = NavGroup.cssClass;
      var _props = this.props;
      var _collapsed = _props._collapsed;
      var _onClick = _props._onClick;
      var _open = _props._open;
      var _withActiveNavGroups = _props._withActiveNavGroups;
      var _withTooltips = _props._withTooltips;
      var children = _props.children;
      var className = _props.className;
      var icon = _props.icon;
      var label = _props.label;


      var childSelected = !!_.find(React.Children.toArray(children), function (item) {
        return item.props.selected;
      });

      return React.createElement(_NavLink.NavLink, {
        className: (0, _classnames2.default)(cssClass.CONTAINER, _open && cssClass.OPEN, className),
        icon: icon,
        label: label,
        onClick: _onClick,
        selected: _withActiveNavGroups && childSelected,
        _collapsed: _collapsed,
        _withArrow: true,
        _withTooltips: _withTooltips
      });
    }
  }]);

  return NavGroup;
}(React.PureComponent);

NavGroup.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_NavLink.NavLink)).isRequired,
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,

  // Internal use only:
  _collapsed: PropTypes.bool,
  _onClick: PropTypes.func,
  _open: PropTypes.bool,
  _withActiveNavGroups: PropTypes.bool,
  _withTooltips: PropTypes.bool
};

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open"
};