"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./TextInput.less");

var TextInput = exports.TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.state = { inFocus: false, hidden: true };
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.toggleHidden = _this.toggleHidden.bind(_this);
    return _this;
  }

  _createClass(TextInput, [{
    key: "onFocus",
    value: function onFocus() {
      var onFocus = this.props.onFocus;


      this.setState({ inFocus: true });
      if (onFocus) {
        onFocus();
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var onBlur = this.props.onBlur;


      this.setState({ inFocus: false });
      if (onBlur) {
        onBlur();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: "toggleHidden",
    value: function toggleHidden() {
      this.setState({ hidden: !this.state.hidden });
    }
  }, {
    key: "render",
    value: function render() {
      var wrapperClass = "TextInput";

      // add additional wrapper classes
      if (this.props.error) wrapperClass += " TextInput--hasError";

      // TODO:  throw error for mutually exclusive states
      if (this.props.readOnly) {
        wrapperClass += " TextInput--readonly";
      } else if (this.props.disabled) {
        wrapperClass += " TextInput--disabled";
      } else if (this.state.inFocus) {
        wrapperClass += " TextInput--inFocus";
      }

      // placeholder shown
      if (!this.props.value && this.props.placeholder) {
        wrapperClass += " TextInput--placeholder-shown";
      }

      // note on the upper right corner
      var inputNote = void 0;
      if (this.props.required) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "TextInput--required" },
          "required"
        );
      }
      if (this.props.error) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "TextInput--error" },
          this.props.error
        );
      }

      var type = void 0;
      if (this.props.type === "password") {
        type = this.state.hidden ? "password" : "text";
      } else {
        type = this.props.type || "text";
      }

      var additionalProps = _lodash2.default.omit(this.props, Object.keys(TextInput.propTypes));

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(wrapperClass, this.props.className) },
        _react2.default.createElement(
          "div",
          { className: "TextInput--infoRow" },
          _react2.default.createElement(
            "label",
            { className: "TextInput--label", htmlFor: this.props.name },
            this.props.label
          ),
          inputNote
        ),
        _react2.default.createElement("input", _extends({}, additionalProps, {
          autoComplete: this.props.disableAutocomplete && "off",
          className: "TextInput--input",
          disabled: this.props.disabled,
          name: this.props.name,
          onBlur: this.onBlur,
          onChange: this.props.onChange,
          onKeyPress: this.props.onKeyPress,
          onFocus: this.onFocus,
          placeholder: this.props.placeholder,
          readOnly: this.props.readOnly,
          ref: "input",
          required: this.props.required,
          type: type,
          value: this.props.value
        })),
        this.props.enableShow && _react2.default.createElement(
          "button",
          { type: "button", className: "TextInput--link", onClick: this.toggleHidden },
          this.state.hidden ? "Show" : "Hide"
        )
      );
    }
  }]);

  return TextInput;
}(_react2.default.Component);

TextInput.propTypes = {
  disabled: PropTypes.bool,
  disableAutocomplete: PropTypes.bool,
  enableShow: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.node,
  className: PropTypes.string
};