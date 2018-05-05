"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDatepicker = require("react-datepicker");

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _reactDatetime = require("react-datetime");

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

require("./DateInput.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this.state = { inFocus: false };

    _this.isValidDate = _this.isValidDate.bind(_this);
    return _this;
  }

  _createClass(DateInput, [{
    key: "onChange",
    value: function onChange(v) {
      this.input.blur();
      this.props.onChange(v);
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(current) {
      var afterMin = true;
      var beforeMax = true;
      if (this.props.min) {
        afterMin = current.isSameOrAfter(this.props.min);
      }
      if (this.props.max) {
        beforeMax = current.isSameOrBefore(this.props.max);
      }
      return afterMin && beforeMax;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = ["DateInput"];

      // add additional wrapper classes
      if (this.props.error) {
        classes.push("DateInput--hasError");
      }

      // TODO:  throw error for mutually exclusive states
      if (this.props.readOnly) {
        classes.push("DateInput--readonly");
      } else if (this.props.disabled) {
        classes.push("DateInput--disabled");
      } else if (this.state.inFocus) {
        classes.push("DateInput--inFocus");
      }

      // placeholder shown
      if (!this.props.value && this.props.placeholder) {
        classes.push("DateInput--placeholder-shown");
      }

      // note on the upper right corner
      var inputNote = void 0;
      if (this.props.required) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "DateInput--required" },
          "required"
        );
      }
      if (this.props.error) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "DateInput--error" },
          this.props.error
        );
      }

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(classes, this.props.className) },
        _react2.default.createElement(
          "div",
          { className: "DateInput--infoRow" },
          _react2.default.createElement(
            "label",
            { className: "DateInput--label", htmlFor: this.props.name },
            this.props.label
          ),
          inputNote
        ),
        this.props.useTime ? _react2.default.createElement(_reactDatetime2.default, {
          className: "DateTimePicker",
          onChange: this.props.onChange,
          value: this.props.value,
          onBlur: function onBlur() {
            return _this2.setState({ inFocus: false });
          },
          onFocus: function onFocus() {
            return _this2.setState({ inFocus: true });
          },
          isValidDate: this.isValidDate,
          inputProps: {
            className: "DateInput--input",
            placeholder: this.props.placeholder,
            name: this.props.name,
            disabled: this.props.disabled || this.props.readOnly,
            required: this.props.required
          }
        }) : _react2.default.createElement(_reactDatepicker2.default, {
          calendarClassName: "DatePicker",
          className: "DateInput--input",
          disabled: this.props.disabled || this.props.readOnly,
          maxDate: this.props.max,
          minDate: this.props.min,
          name: this.props.name,
          onBlur: function onBlur() {
            return _this2.setState({ inFocus: false });
          },
          onFocus: function onFocus() {
            return _this2.setState({ inFocus: true });
          },
          onSelect: this.props.onChange,
          placeholderText: this.props.placeholder,
          readOnly: this.props.readOnly,
          ref: "input",
          required: this.props.required,
          selected: this.props.value
        })
      );
    }
  }]);

  return DateInput;
}(_react2.default.Component);

exports.default = DateInput;


var dateType = PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(_moment2.default)]);

DateInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: dateType,
  className: PropTypes.string,
  min: dateType,
  max: dateType,
  useTime: PropTypes.bool
};