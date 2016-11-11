"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
      this.setState({ inFocus: true });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({ inFocus: false });
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

      var type = this.props.type === "password" && this.state.hidden ? "password" : "text";

      return _react2.default.createElement(
        "div",
        { className: wrapperClass },
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
        _react2.default.createElement("input", {
          autoComplete: this.props.disableAutocomplete && "off",
          className: "TextInput--input",
          disabled: this.props.disabled,
          name: this.props.name,
          onBlur: this.onBlur,
          onChange: this.props.onChange,
          onFocus: this.onFocus,
          placeholder: this.props.placeholder,
          readOnly: this.props.readOnly,
          ref: "input",
          required: this.props.required,
          type: type,
          value: this.props.value
        }),
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
  disabled: _react2.default.PropTypes.bool,
  disableAutocomplete: _react2.default.PropTypes.bool,
  enableShow: _react2.default.PropTypes.bool,
  error: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.node,
  readOnly: _react2.default.PropTypes.bool,
  required: _react2.default.PropTypes.bool,
  type: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.node
};