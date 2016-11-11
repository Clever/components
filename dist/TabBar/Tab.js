"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tab;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Tab.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Tab(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var component = _ref.component;
  var disabled = _ref.disabled;
  var href = _ref.href;
  var id = _ref.id;
  var onSelect = _ref.onSelect;
  var selected = _ref.selected;

  var additionalProps = _objectWithoutProperties(_ref, ["children", "className", "component", "disabled", "href", "id", "onSelect", "selected"]);

  var cssClass = Tab.cssClass;


  var Wrapper = component;
  if (!Wrapper) {
    Wrapper = href ? "a" : "button";
  }

  return _react2.default.createElement(
    Wrapper,
    _extends({
      className: (0, _classnames2.default)(cssClass.CONTAINER, disabled && cssClass.DISABLED, selected && cssClass.SELECTED, className),
      disabled: disabled,
      href: href,
      onClick: function onClick(e) {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onSelect(id);
      }
    }, additionalProps),
    children
  );
}

Tab.propTypes = {
  children: _react.PropTypes.node.isRequired,
  className: _react.PropTypes.string,
  component: _react.PropTypes.any,
  disabled: _react.PropTypes.bool,
  href: _react.PropTypes.string,
  id: _react.PropTypes.any.isRequired,
  onSelect: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

Tab.defaultProps = {
  onSelect: function onSelect() {}
};

Tab.cssClass = {
  CONTAINER: "TabBar--Tab",
  DISABLED: "TabBar--Tab--disabled",
  SELECTED: "TabBar--Tab--selected"
};