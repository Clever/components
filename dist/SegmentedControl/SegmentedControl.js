"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

require("./SegmentedControl.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SegmentedControl selection. Shows several options as defined in the props and
 * allows the user to select one of those options.
 */
var SegmentedControl = exports.SegmentedControl = function (_React$Component) {
  _inherits(SegmentedControl, _React$Component);

  _createClass(SegmentedControl, null, [{
    key: "validateProps",
    value: function validateProps(props) {
      var defaultValue = props.defaultValue;
      var onSelect = props.onSelect;
      var value = props.value;


      if (value && defaultValue) {
        throw new Error("SegmentedControl must either be controlled or uncontrolled " + "(specify either the `value` prop, or the `defaultValue` prop, but not both).\n" + "More info: https://fb.me/react-controlled-components");
      }

      if (value && !onSelect) {
        throw new Error("`onSelect` prop required when using SegmentedControl as a controlled component. " + "Either provide the `onSelect` prop, or replace `value` with `defaultValue` for an " + "uncontrolled SegmentedControl.\n" + "More info: https://fb.me/react-controlled-components");
      }

      return props;
    }
  }]);

  function SegmentedControl(props) {
    _classCallCheck(this, SegmentedControl);

    var _this = _possibleConstructorReturn(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).call(this, SegmentedControl.validateProps(props)));

    _this.state = { selected: props.defaultValue || null };
    return _this;
  }

  _createClass(SegmentedControl, [{
    key: "onSelect",
    value: function onSelect(_ref) {
      var disabled = _ref.disabled;
      var value = _ref.value;

      if (disabled || this.props.disabled || value === this.state.selected) {
        return;
      }

      this.setState({ selected: value });
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.props.value || this.state.selected;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disabled = _props.disabled;
      var options = _props.options;
      var value = _props.value;

      var selected = value || this.state.selected;
      var cssClass = SegmentedControl.cssClass;

      var idx = -1;
      var selectableItems = _lodash2.default.map(options, function (option) {
        var isSelected = option.value === selected;
        var classes = [cssClass.OPTION];
        if (isSelected) {
          classes.push(cssClass.SELECTED);
        }
        if (disabled || option.disabled) {
          classes.push(cssClass.DISABLED);
        }

        idx = idx + 1;
        return _react2.default.createElement(
          "button",
          {
            className: classes.join(" "),
            onClick: function onClick() {
              return _this2.onSelect(option);
            },
            key: idx,
            type: "button"
          },
          option.content
        );
      });

      return _react2.default.createElement(
        "div",
        { className: [cssClass.CONTAINER, className].join(" ") },
        selectableItems
      );
    }
  }]);

  return SegmentedControl;
}(_react2.default.Component);

SegmentedControl.propTypes = {
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    content: _react.PropTypes.node.isRequired,
    disabled: _react.PropTypes.bool,
    value: _react.PropTypes.any.isRequired
  })).isRequired,
  onSelect: _react.PropTypes.func,
  value: _react.PropTypes.any
};

SegmentedControl.cssClass = {
  CONTAINER: "segmented_control",
  DISABLED: "segmented_control--selectable-item--disabled",
  OPTION: "segmented_control--selectable-item",
  SELECTED: "segmented_control--selectable-item--selected"
};